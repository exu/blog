+++
date = "2015-11-25T16:56:07+01:00"
title = "Golang Channels - Receiving data"
description = "Receiving data from multiple channels"
tags = ["go", "channels", "concurrency"]
slug = "golang-channels-receiving-data-from-multiple-channels"
+++


## Channels basic example:

When we want to receive data from multiple channels (probably filled by
multiple goroutines) we should use `select` statement. It simply choose
channel which receive value as first (It's in context of time)

{{< highlight go >}}
package main

import "time"
import "fmt"

func main() {
	c1 := make(chan string)
	c2 := make(chan string)

	go func() {
		time.Sleep(time.Second * 3)
		c1 <- "one"
	}()

	go func() {
		time.Sleep(time.Second * 2)
		c2 <- "two"
	}()

	select {
	case msg1 := <-c1:
		fmt.Println("received", msg1)
	case msg2 := <-c2:
		fmt.Println("received", msg2)
	}
}

{{< /highlight >}}

<a href="http://play.golang.org/p/wnusjAPW1g" target="_new">Run it on play.golang.org</a>

### Code Summary

This simple example contains several important points about receiving data from
multiple channels:

- Select blocks until value will be sent through channel (whatever channel in case statement).
- In example above we read data from first channel which receive value (`msg2`)
- If we want receive from all channels, we should loop through select statement
as many times as many values we want to read.


### Want More?

If you like My Go basics series feel free to read more at [Go Basics Series](/series/go-basics/)
