+++
date = "2015-11-25T16:56:07+01:00"
title = "Golang Channels - Basics"
description = "Golang Channels - Basic channels usage in simple examples"
tags = ["go", "channels", "concurrency"]
series = ["Go basics"]
+++


## Channels basic example:

Channels was made for synchronizing data between concurrently working goroutines (golang
light threads). By default operations on channel (reading and writing) are blocking.

Let's look for simple example below:

{{< highlight go >}}
    package main

    import "fmt"
    import "time"

    func doIt(done chan bool) {
    	fmt.Print("working...")
    	time.Sleep(time.Second)
    	fmt.Println("done")

        // send value to channel
    	done <- true
    }

    func main() {
        // We're creating channel and
        // starting doIt function as gorouine
    	done := make(chan bool)
    	go doIt(done)

        // reading from channel with `<-` blocks program until
        // we receive value after one second in `doIt` function
    	a := <-done
    	fmt.Println(a)
    }
{{< /highlight >}}

<a href="http://play.golang.org/p/gh5ihivC4L" target="_new">Run it on play.golang.org</a>

### Code Summary

This simple example contains several important points about channels:

- Go block on reading from channel
- There is no control of running goroutines, try to remove reading from channel (`a := <-done`) You'll see that your program will not complete `doIt` function
- We're passing channels to functions as something similar to reference (channels are
used on both sides - goroutine which write to channel, and goroutine which reads from it - main function in this example)

### Want More?

If you like My Go basics series feel free to read more at [Go Basics Series](/series/go-basics/)
