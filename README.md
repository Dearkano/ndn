# NDN-AFS Project
##### Author: Vayne Tian
##### Date: 2019/08/15

## Overview
NDN-AFS Project aims at combining named-data networking and ASTRI blockchain file system, especially replacing Tn (tracking node in AFS) by NDN. At the moment, this system can successfully be installed on different systems, i.e. Centos, Ubuntu, and IOT devices like Raspberry Pi. In the future, the system will be the base of chainchat, a decentralized chat tool.

**AFS**

ASTRI File System is an advanced file system developed by ASTRI, which is based on blockchain technology. In AFS, a file is identified by an unique id called *afid*, and it's divided into 16 blocks stored on different Fn (file node in AFS). When fetching the file, any eight blocks of these can be used to recover the file on the Rn (retrieve node in AFS) and then we can check the md5 to verify the integrity of the file.

In a traditional way, a request for a file in AFS will first go find a Tn, which stores the File-Rn Table. In other words, through Tn can we get the Rn address of a file. However, several limits of Tn drive us to another solution. When a file is uploaded on the Un (upload node in AFS), there will be a few minutes' delay before the table is updated. Any request for this file at the moment will get the response like 'file not found'. To solve this, named-data networking is going to be introduced.

**NDN**

Named-data networking is a proposed Future Internet architecture inspired by years of empirical research into network usage and a growing awareness of unsolved problems in contemporary internet architectures like IP.

In NDN-AFS project, we use NDN primarily to replace tracking node whose function is mainly focused on searching the Rn where the searching target locates. We build the network among the Rns. Once the request arrives in the root node, it will be multicast to other rnodes according to the topology. Rn will find the file's information, includes whether the file exists, or recover and deliver the file back. In a wider range, a network among the root nodes and a http server is built. Send a request to global server and the interest will be mutlicast to the root nodes. Then the root nodes continuely deliver the interests and once get the result, i.e. expired time and cluster name, the data packet can be sent back using the former route.

![](./images/topology.png)
