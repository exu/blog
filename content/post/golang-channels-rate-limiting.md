+++
date = "2015-11-26T15:49:43+01:00"
description = "When you need to limit rate of operations"
slug = "golang-channels-rate-limiting"
title = "Golang channels - rate limiting"
series = ["Go basics"]
tags = ["go", "golang", "channels"]
+++

When you need to limit rate of operations done by your program (e.g. low resources
on node) go gives you very nice tool fo that. We'll use `ticker` which creates
a `time.Time` channel and sends to it value with configured interval.

First we add `50` values to our requests channel. We know that there will not be
new data, so we can close channel. Next we define ticker and iterate through
our `requests` channel.

{{< highlight go >}}
package main

import (
	"fmt"
	"time"
)

func main() {
	requests := make(chan int, 50)

	for i := 1; i <= 50; i++ {
		requests <- i
	}
	close(requests)

	limiter := time.Tick(time.Millisecond * 200)

	for req := range requests {
		<-limiter
		fmt.Println("request", req, time.Now())
	}

}
{{< /highlight >}}

{{< play "wHYHe_DA7s" >}}

### Code Summary

Why we simply don't use `time.Sleep()`? Ticker is better for that
because it can be canceled what gives us control over it.



### Want More?

If you like My Go basics series feel free to read more at [Go Basics Series](/series/go-basics/)
