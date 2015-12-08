+++
date = "2015-12-08T06:42:47+01:00"
description = "Sometimes you want to filter your data through several concurent functionsx"
series = ["Go basics"]
slug = "golang-channels-pipes"
tags = ["go", "golang", "channels", "pipe", "patterns"]
title = "Golang Channels Patterns - pipes"

+++

Sometimes we want to push our data through several functions (filters), when
these functions are Processor itensive it'll be good idea to run
them as go routines.

We'll define our functions as ones which receive and returns channel of the
same type. (`square`, `double`), `gen` function will push values to first channel.

{{< highlight go >}}
package main

import (
	"fmt"
)

func gen(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		for _, n := range nums {
			out <- n
		}
		close(out)
	}()
	return out
}

func square(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		for n := range in {
			out <- n * n
		}
		close(out)
	}()
	return out
}

func double(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		for n := range in {
			out <- n + n
		}
		close(out)
	}()
	return out
}

func main() {
	c := gen(10, 20)
	out := double(double(c))

	fmt.Println(<-out)
	fmt.Println(<-out)

	fmt.Println("Second generator")
	for n := range double(square(square(gen(2, 3, 4, 5)))) {
		fmt.Println(n)
	}
}
{{< /highlight >}}

{{< play "XSxs_5nckC" >}}

When we run this program we'll receive output:

{{< highlight sh >}}
❯ go run 90-patterns-pipeline.go
40
80
Second generator
32
162
512
1250
{{< /highlight >}}


### Code Summary

As we can observe, it's really simple to push data through several
functions with use of channels. With go routines it'll be very easy
to split your work in concurrent environment.


### Want More?

If you like My Go basics series feel free to read more at [Go Basics Series](/series/go-basics/)
