+++
date = "2015-11-27T14:00:00+01:00"
description = "Concurrent programming can be tricky, when you are not carefull enough"
slug = "golang-concurrency-data-races"
title = "Golang concurrency - data races"
series = ["Go basics"]
tags = ["go", "golang", "concurrency", "data-race"]
+++

<img class="main" src="">

{{< mimg "golang-data-race-1.png">}}

Concurrent programming can be tricky, when you are not carefull enough. When you have
several concurrent threads (goroutines), and all of them reads or writes data to some
data structure, they want to do it often in the same period of time which causes that
only one write will happen, or data will be read with invalid value which was not
updated properly.

## Preconditions

To make sure everything will work for you You will need to run examples below
on machine with more than 1 core and with GOMAXPROCS set to greater value than
1 (without that there will be no two or more concurrently working goroutines
on the same time) - Go > 1.5 sets GOMAXPROCS to number of cores automatically.

## Exmaple 1 - data race

In below examples We'll implement simple counter struct which will be incrementing
simple integer.

We'll run `100` goroutines, each of them will increment our counter `10 000` times
which gives us `1 000 000`, simple enough.

{{< highlight go >}}
package main

import (
	"fmt"
	"time"
)

type intCounter int64

func (c *intCounter) Add(x int64) {
	*c++
}

func (c *intCounter) Value() (x int64) {
	return int64(*c)
}

func main() {
	counter := intCounter(0)

	for i := 0; i < 100; i++ {
		go func(no int) {
			for i := 0; i < 10000; i++ {
				counter.Add(1)
			}
		}(i)
	}

	time.Sleep(time.Second)
	fmt.Println(counter.Value())

}
{{< /highlight >}}


{{< play "_iZzudgmc5" >}}

Let's run our example (run it on your *local machine*, it looks play.golang.org returns good value):

{{< highlight sh >}}
❯ go run counter.go
248863
{{< /highlight >}}


What's happen? we should have result equals to `1 000 000`.
Whoaaaa! You have your first <strong>data race</strong>!


To detect it before running your program simply run it with `-race` flag:

{{< highlight sh >}}
go run -race app.go
{{< /highlight >}}


which gives you result:

{{< highlight sh >}}
❯ go run -race app.go >> out.txt
==================
WARNING: DATA RACE
Read by goroutine 7:
  main.main.func1()
      /home/exu/src/github.com/exu/go-workshops/101-concurrency-other/app.go:24 +0x42

Previous write by goroutine 6:
  main.main.func1()
      /home/exu/src/github.com/exu/go-workshops/101-concurrency-other/app.go:24 +0x58

Goroutine 7 (running) created at:
  main.main()
      /home/exu/src/github.com/exu/go-workshops/101-concurrency-other/app.go:26 +0x92

Goroutine 6 (running) created at:
  main.main()
      /home/exu/src/github.com/exu/go-workshops/101-concurrency-other/app.go:26 +0x92
==================
Found 1 data race(s)
exit status 66
{{< /highlight >}}

Yeah! Go can detect your data races automatically, run it when you dealing with go routines. These errors can be really tricky on production, I thinks it could be good idea to attach such tests to your building pipeline.

Ok, We have data race, what's next? We'll correct it. There is several techniques in Go
to do it, rule is very simple - synchronize your data!



## Example 2 - Atomic counters

First We'll try to correct Our counter with atomic counters, it's included in go core `sync/atomic` standard library.

{{< highlight go >}}
package main

import (
	"fmt"
	"runtime"
	"sync/atomic"
	"time"
)

type atomicCounter struct {
	val int64
}

func (c *atomicCounter) Add(x int64) {
	atomic.AddInt64(&c.val, x)
	runtime.Gosched()
}

func (c *atomicCounter) Value() int64 {
	return atomic.LoadInt64(&c.val)
}

func main() {
	counter := atomicCounter{}

	for i := 0; i < 100; i++ {
		go func(no int) {
			for i := 0; i < 10000; i++ {
				counter.Add(1)
			}
		}(i)
	}

	time.Sleep(time.Second)
	fmt.Println(counter.Value())
}
{{< /highlight >}}

{{< play "6Qrd3j-zvs" >}}

In order to ensure that this goroutine doesn’t starve the scheduler, we
explicitly yield after each operation with `runtime.Gosched()`. This
yielding is handled automatically with e.g. every `channel` operation and
for blocking calls like `time.Sleep`, but in this case we need to do it
manually.

Now our counter is thread-safe. You can check if data races still exists:
{{< highlight sh >}}
$ go run -race atomic.go
1000000
{{< /highlight >}}

Whoa!! no data races!!

## Example 3 - Mutexes

Now We'll try to correct Our counter with mutexes, it's included in go core `sync` standard library. Using atomic counters and need to run `runtime.Gosched` doesn't look nice. For
Me `mutex` looks and feels a lot better.

Take a look at code written below:

{{< highlight go >}}
package main

import (
	"fmt"
	"sync"
	"time"
)

type mutexCounter struct {
	mu sync.Mutex
	x  int64
}

func (c *mutexCounter) Add(x int64) {
	c.mu.Lock()
	c.x += x
	c.mu.Unlock()
}

func (c *mutexCounter) Value() (x int64) {
	c.mu.Lock()
	x = c.x
	c.mu.Unlock()
	return
}

func main() {
	counter := mutexCounter{}

	for i := 0; i < 100; i++ {
		go func(no int) {
			for i := 0; i < 10000; i++ {
				counter.Add(1)
			}
		}(i)
	}

	time.Sleep(time.Second)
	fmt.Println(counter.Value())

}
{{< /highlight >}}

{{< play "zzGE5yByPo" >}}

Again try to check if data race exists:
{{< highlight sh >}}
$ go run -race mutex.go
1000000
{{< /highlight >}}

Yeah! No data races again!


## Conclusion

When doing concurrent programming:

- Your program don't work sequentially
- Be really careful when doing data synchronization between goroutines
- Use channels, mutexes, atomic counters
- Use included tools in your language, `-race` is your friend

Good exercise can be to try to implement previous counter solutions using `channels`.


### Want More?

If you like My Go basics series feel free to read more at [Go Basics Series](/series/go-basics/)
