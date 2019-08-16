## build ndn docker
**use docker image online from dockerhub**

`docker run -v /data/tmp/:/tmp -v /aos:/aos -it --privileged=true --name=ndn-astri-docker --network host -d vaynetian/ndn-astri-docker /bin/bash`

**use local docker image through making dockerfile**

`docker build -t ndn-docker .`

`docker run -v /data/tmp/:/tmp -v /aos:/aos -it --privileged=true --name=ndn-astri-docker --network host -d vaynetian/ndn-docker /bin/bash`

## run ndn docker

**run the container**

`docker exec -it ndn-astri-docker bash`

**update ndn repo**

```
cd ndn \
&& git pull \
&& npm install
```

**run rnode**
```
cd rnode \
&& screen node rnode
```

**run ndn server**

`screen npm run dev`