+++
date = "2015-11-26T15:49:43+01:00"
description = "Sometimes you want to break goroutine from other goroutine"
slug = "golang-channels-quit-channel"
title = "Golang channels - quit channel"
series = ["Go basics"]
tags = ["go", "golang", "channels"]
+++

Sometimes you may want to break your program running inside goroutine from
other goroutine or simply from main function. Below You can see My simple
implementation of go quit channel.

{{< highlight go >}}
package main

import (
	"time"
)

func main() {
	quit := make(chan bool)
	go func() {
		for {
			select {
			case <-quit:
				return
			default:
				println(".")
				time.Sleep(time.Millisecond * 100)
			}
		}
	}()

	// Do stuff
	time.Sleep(time.Second)

	// Quit goroutine
	quit <- true
}
{{< /highlight >}}

{{< play "LCtaucaU65" >}}

### Code Summary

In context of communicating from external goroutines:

- Use `select` to read from multiple channels (in our example We only want
to break infinite loop)
- `default` is always run when there is no value from channel


### Want More?

If you like My Go basics series feel free to read more at [Go Basics Series](/series/go-basics/)
