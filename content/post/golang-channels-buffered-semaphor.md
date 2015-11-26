+++
date = "2015-11-26T15:49:43+01:00"
description = "Now We try to block goroutine with buffered semaphor"
slug = "golang-channels-buffered-semaphor"
title = "Golang channels - buffered semaphor"
series = ["Go basics"]
tags = ["go", "golang", "channels"]
+++

We try to run 20 concurrent goroutines (all of them will start), in example below
We're setting channel buffer value to `5`, go blocks on write where there is no
more room in our channel buffer (we currently have `5`) when first `5` goroutines run
buffer will be full and next `15` will wait on write. After first goroutine complete and
read from channel next hunged goroutine write data to goroutine.


{{< highlight go >}}
package main

import (
	"fmt"
	"time"
)

var sem = make(chan int, 5)

func main() {
	for i := 0; i < 20; i++ {
		go handle()
	}

	time.Sleep(time.Second * 10)
}

func handle() {
	println("starting")
	sem <- 1
	fmt.Println("Step", time.Now())
	time.Sleep(time.Second)
	<-sem
}
{{< /highlight >}}

{{< play "zpUiSJoPv3" >}}

### Code Summary

In context of writing to channels there are some important things:

- Writing to channels blocks
- If buffer is set (second param in `make` function) writing is blocked after buffer is full
until that all goroutines can write to this channel.
- In our example all goroutines have started (5 are working, 15 are blocked on write)

Play around change buffer value to other, look how it will work with your changes.

### Want More?

If you like My Go basics series feel free to read more at [Go Basics Series](/series/go-basics/)
