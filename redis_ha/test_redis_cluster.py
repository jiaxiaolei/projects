

from rediscluster import RedisCluster

startup_nodes = [{"host": "10.122.69.151", "port": "6379"}]

startup_nodes = [{"host": "10.122.69.151", "port": "6379"},
                 {"host": "10.122.69.152", "port": "6379"},
                 {"host": "10.122.69.153", "port": "6379"},
                ]


rc = RedisCluster(startup_nodes=startup_nodes, decode_responses=True)

rc.set("foo", "bar")


print(rc.get("foo"))
