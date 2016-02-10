<?php

$array = [1,2,3,4,5,6,7,8,9];

foreach(array_chunk($array, 2) as $part) {
    print_r($part);
}