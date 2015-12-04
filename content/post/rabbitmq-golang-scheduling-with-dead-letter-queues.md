+++
date = "2015-11-30T10:49:43+01:00"
slug = "rabbitmq-golang-scheduling-with-dead-letter-queues"
title = "RabbitMQ - Scheduling with dead-letter queues, Golang example"
description = "You don't need scheduling software to postpone data in time, you can use simple trick in RabbitMQ and Dead-letter queues with TTL"
tags = ["queues", "rabbitmq", "go", "golang"]
draft = true
+++

If you're using RabbitMQ in your system and want to postpone some messages in
time you can solve this problem using RabbitMQ extension: Dead lettering.


## What's dead-letter queue

From RabbitMQ documentation:

Messages from a queue can be 'dead-lettered'; that is, _republished to another exchange_ when any of the following events occur:

- The message is rejected (basic.reject or basic.nack) with requeue=false,
- The TTL for the message expires; or
- The queue length limit is exceeded.



## Definig base queue



## Configure dead letter queue


    /**
     * @param AMQPChannel $channel
     * @return array
     */
    protected function getDeadLetterExchangeConfiguration(AMQPChannel $channel)
    {
        // we can define "dead letter" exchange which will catch
        // all message that will be rejected or nacked
        $channel->exchange_declare('dead.letter', 'direct', false, false, false);
        $channel->queue_declare('dead', false, true, false, false, false);
        $channel->queue_bind('dead', 'dead.letter');

        $args = [
            "x-dead-letter-exchange" => ["S", "dead.letter"],
            "x-dead-letter-routing-key" => ["S", ""]
        ];

        return $args;
    }




## Moving data to dead letter queue



## Producer code




## Consumer code which listen for postponed data
