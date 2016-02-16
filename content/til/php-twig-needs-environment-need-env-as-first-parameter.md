+++
date = "2016-02-11T08:30:38+01:00"
description = "Today I learned: PHP - Twig needs_environment need env as first parameter in twig mapped function"
series = ["til"]
slug = "til-php-twig-needs_environment-option"
tags = ["til", "php"]
title = "TIL: PHP - Twig needs_environment need env as first parameter"

+++

# PHP Twig function configuration

If there is 'needs_environment' option in twig function definition you'll need to pass
Twig_Environment as first parameter to your mapped twig function

{{< highlight php >}}

new \Twig_Function_Method(
    $this,
    'some',
    [
        'needs_environment' => true,
    ]
)


function some(Twig_Environment $env, $otherParams) {
    return "";
}

{{< /highlight >}}
