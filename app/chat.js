/*
 * Copyright (C) 2014-2017 Regents of the University of California.
 * @author: Zijun Tian <vaynetian@zju.edu.cn>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * A copy of the GNU Lesser General Public License is in the file COPYING.
 */
const {
    Face,
    Name,
    UnixTransport,
    Interest
} = require('ndn-js-sdk')
export default class {
    constructor(username, targetPrefix, rootPrefix, face, keyChain, certificateName) {
        this.username = username
        this.targetPrefix = targetPrefix
        this.face = face
        this.keyChain = keyChain
        this.certificateName = certificateName

        this.chatPrefix = (new Name(rootPrefix)).append(targetPrefix)

        face.registerPrefix(this.chatPrefix, this.onInterest,
            this.onRegisterFailed)
    }

    onRegisterFailed = () => console.log("Error: register failed")

    /**
     * Send the data packet which contains the user's message
     * @param {Name} Interest name prefix
     * @param {Interest} The interest
     * @param {Face} The face
     * @param {number} interestFilterId
     * @param {InterestFilter} filter
     */
    onInterest = (prefix, interest, face, interestFilterId, filter) => {
        var content = {};

        // chatPrefix should really be saved as a name, not a URI string.
        var chatPrefixSize = new Name(this.chatPrefix).size();
        var seq = parseInt(interest.getName().get(chatPrefixSize + 1).toEscapedString());
    }

    expressInterest = (name) => {
        function asyncInterest(name) {
            return new Promise(function (resolve) {
                // console.log("Express name " + name.toUri());
                face.expressInterest(name, (_, data) => resolve({
                    code: 0,
                    data
                }), () => resolve({
                    code: 1
                }));
            })
        }
    }
}