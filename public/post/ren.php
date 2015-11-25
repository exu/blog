<?php


function getCategory($f) {
    $content = file_get_contents($f);
    preg_match('/category: (.*)/i', $content, $matches);
    return $matches[1];
}

foreach (glob("*.html") as $f) {
    preg_match('/([0-9]{4})-([0-9]{2})-(.*)/i', $f, $matches);
    $year = $matches[1];
    $month = $matches[2];
    $file = $matches[3];
    $category = trim(getCategory($f));

    $dir = "../{$category}/{$year}/{$month}";

    `mkdir -p $dir`;
    `mv "{$f}" "$dir/$file"`;
}
