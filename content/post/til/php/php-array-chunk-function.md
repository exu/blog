+++
date = "2016-02-10T16:33:10+01:00"
description = "Today I learned: array_chunk"
series = ["til"]
slug = "php-array-chunk-function"
tags = ["til", "php"]
title = "php array chunk function"
+++

## Usage

{{< highlight php >}}
<?php

$array = [1,2,3,4,5,6,7,8,9];

foreach(array_chunk($array) as $part) {
    print_r($part);
}

{{< /highlight >}}


and you'll get output chunked by given chunk size:


{{< highlight sh >}}
Array
(
    [0] => 1
    [1] => 2
)
Array
(
    [0] => 3
    [1] => 4
)
Array
(
    [0] => 5
    [1] => 6
)
Array
(
    [0] => 7
    [1] => 8
)
Array
(
    [0] => 9
)
{{< /highlight >}}

thanks [@200PercentDev](https://twitter.com/200PercentDev) for pointing this out.
