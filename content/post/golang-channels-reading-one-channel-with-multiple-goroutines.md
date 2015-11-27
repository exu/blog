+++
date = "2015-11-27T10:49:43+01:00"
description = "This simple example will show how to read data from one channel in mutliple goroutines"
slug = "golang-channels-reading-one-channel-with-multiple-goroutines"
title = "Golang channels - Reading one channels with multiple goroutines"
series = ["Go basics"]
tags = ["go", "golang", "channels", "timer"]
+++

Reading from ticker by multiple goroutines is quite simple. We need iterate
through it values using `range`.

{{< highlight go >}}
package main

import "time"
import "fmt"

func main() {
	ticker := time.NewTicker(time.Millisecond * 500)

	go func() {
		for t := range ticker.C {
			fmt.Println("Ene", t)
		}
	}()

	go func() {
		for t := range ticker.C {
			fmt.Println("Due", t)
		}
	}()

	go func() {
		for t := range ticker.C {
			fmt.Println("Fake", t)
		}
	}()

	time.Sleep(time.Second * 4)
	ticker.Stop()
	fmt.Println("Ticker stopped")
}
{{< /highlight >}}

{{< play "LQ9eQBOBMs" >}}

### Code Summary

There are several important things in this example:

- until we sleep we've had 3 goroutines, each of them try to read
from our ticker channel, but only one in given period of time
can do this,
- it looks like there is something like queue (this should be confirmed! it's only observation)

### Want More?

If you like My Go basics series feel free to read more at [Go Basics Series](/series/go-basics/)
