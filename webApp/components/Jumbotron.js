import React, { Component } from 'react';
import Video from './Video';
import Toggle from 'react-toggle';

class Jumbotron extends Component {
  constructor(props) {
    super(props)
    this.state = {
      webCamAllowed: false,
      jumboShown: false,
      outsideStream: null,
      alertWrapper: false,
      mobile: undefined
    }
  }

  toggleVideo() {
    this.checkCam((camAllowed) => {
      if (!camAllowed) {
        this.state.jumboShown = false;
        // request camera access
        navigator.getUserMedia  = navigator.getUserMedia ||
                                  navigator.webkitGetUserMedia ||
                                  navigator.mozGetUserMedia ||
                                  navigator.msGetUserMedia;
        navigator.getUserMedia({ video: true, audio: false }, () => {}, () => {});
        this.state.alertWrapper = true;
        setTimeout(() => {
          this.setState({alertWrapper: false})
        }, 2000)
      }
      else {
        // otherwise if camera is allowed toggle jumboShown status
        this.state.jumboShown = !this.state.jumboShown;
        if (this.state.jumboShown) {
          this.props.socket.emit('is-a-streamer')
          document.getElementById('chat-box').style.height = "49.5%"
        }
        if (!this.state.jumboShown) {
          this.props.socket.emit('opt-out-of-jumbo') // if you toggle off the video, let the server know.
          console.log('opt-out-of-jumbo', this.state.outsideStream)
          this.state.outsideStream.getVideoTracks()[0].stop();
          document.getElementById('chat-box').style.height = "92%"
        }
      }
      // trigger a render
      this.setState({webCamAllowed: camAllowed})
    })
  }

  connectVideoToStream() {
    var video = document.getElementById('video-player')
    console.log(this.state.outsideStream)
    video.src = window.URL.createObjectURL(this.state.outsideStream)
    video.play()
  }

  // check if access to webcam is granted. returns bool
  checkCam(cb) {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        // Firefox 38+ seems having support of enumerateDevicesx
        navigator.enumerateDevices = function(callback) {
            navigator.mediaDevices.enumerateDevices().then(callback);
        };
    }

    var MediaDevices = [];
    var isHTTPs = location.protocol === 'https:';
    var canEnumerate = false;

    if (typeof MediaStreamTrack !== 'undefined' && 'getSources' in MediaStreamTrack) {
        canEnumerate = true;
    } else if (navigator.mediaDevices && !!navigator.mediaDevices.enumerateDevices) {
        canEnumerate = true;
    }

    var hasMicrophone = false;
    var hasSpeakers = false;
    var hasWebcam = false;

    var isMicrophoneAlreadyCaptured = false;
    var isWebcamAlreadyCaptured = false;

    function checkDeviceSupport(callback) {
        if (!canEnumerate) {
            return;
        }

        if (!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
            navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack);
        }

        if (!navigator.enumerateDevices && navigator.enumerateDevices) {
            navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator);
        }

        if (!navigator.enumerateDevices) {
            if (callback) {
                callback();
            }
            return;
        }

        MediaDevices = [];
        navigator.enumerateDevices((devices) => {
            devices.forEach((_device) => {
                var device = {};
                for (var d in _device) {
                    device[d] = _device[d];
                }

                if (device.kind === 'audio') {
                    device.kind = 'audioinput';
                }

                if (device.kind === 'video') {
                    device.kind = 'videoinput';
                }

                var skip;
                MediaDevices.forEach(function(d) {
                    if (d.id === device.id && d.kind === device.kind) {
                        skip = true;
                    }
                });

                if (skip) {
                    return;
                }

                if (!device.deviceId) {
                    device.deviceId = device.id;
                }

                if (!device.id) {
                    device.id = device.deviceId;
                }

                if (!device.label) {
                    device.label = 'Please invoke getUserMedia once.';
                    if (!isHTTPs) {
                        device.label = 'HTTPs is required to get label of this ' + device.kind + ' device.';
                    }
                } else {
                    if (device.kind === 'videoinput' && !isWebcamAlreadyCaptured) {
                        isWebcamAlreadyCaptured = true;
                    }

                    if (device.kind === 'audioinput' && !isMicrophoneAlreadyCaptured) {
                        isMicrophoneAlreadyCaptured = true;
                    }
                }

                if (device.kind === 'audioinput') {
                    hasMicrophone = true;
                }

                if (device.kind === 'audiooutput') {
                    hasSpeakers = true;
                }

                if (device.kind === 'videoinput') {
                    hasWebcam = true;
                }

                // there is no 'videoouput' in the spec.

                MediaDevices.push(device);
            });

            if (callback) {
                callback();
            }
        });
    }

    // check for microphone/camera support!
    checkDeviceSupport(() => {
      console.log('GOT CALLED', isWebcamAlreadyCaptured)
      if (!cb) this.setState({webCamAllowed: isWebcamAlreadyCaptured});
      else cb(isWebcamAlreadyCaptured)
    });
  }


  componentDidMount() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    this.setState({mobile: check});

    this.checkCam() // update the state of camera

    navigator.getUserMedia  = navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia;

    var peers = {
      'id': { // <- actual id
        'peer': null,
        'isConnected': false
      }
    };

    var outsideStream;
    var myID;
    this.props.socket.on('become-streamer', (idInfo) => {
      console.log('become-streamer')
      // get video stream
      navigator.getUserMedia({ video: true, audio: false }, (stream) => {
        // make stream global for peers who connect later
        outsideStream = stream;
        this.setState({outsideStream: stream})
        var video = document.getElementById('video-player')
        video.src = window.URL.createObjectURL(outsideStream)
        // create peer connections wil all sockets and stream to them
          idInfo.allIDs.forEach((id) => {
            if (idInfo.myID !== id) {
              peers[id] = {};
              peers[id].isConnected = false;
              peers[id].peer = new SimplePeer({ initiator: true, stream: stream, trickle: false})
              peers[id].peer.on('signal', (data) => {
                if (!peers[id].isConnected) {
                  this.props.socket.emit('connect-to-peer', {id: id, SDP: data})
                  peers[id].isConnected = true
                }
              })
            }
          })
      }, (error) => {
        console.log(error)
      })
    })

    // as new peers join give them the stream
    this.props.socket.on('new-peer', (id) => {
      console.log('new-peer', id)
      peers[id] = {};
      peers[id].peer = new SimplePeer({ initiator: true, stream: outsideStream, trickle: false })
      peers[id].peer.on('signal', (data) => {
        if (!peers[id].isConnected) {
          console.log(data)
          this.props.socket.emit('connect-to-peer', {id: id, SDP: data})
          peers[id].isConnected = true;
        }
      })
    })

    this.props.socket.on('signal-peer2', (data) => {
      console.log('signal peer 2', data.id)
      console.log(peers[data.id].peer)
      // peers[data.id] = {};
      peers[data.id].peer.signal(data.SDP);
    })

    // if you are not the streamer connect with them
    this.props.socket.on('connect-to-streamers-peer', (data) => {
      console.log('connect-to-streamers-peer', data.id)
      // handle the case where video streamer is the peer
      console.log('not undefined:', peers[data.id])

        peers[data.id] = {};
        peers[data.id].isConnected = false;
        peers[data.id].peer = new SimplePeer();
        peers[data.id].peer.signal(data.SDP);
        peers[data.id].peer.on('signal', (SDP) => {
          console.log('sending SDP back to streamer:', data.id)
          if (!peers[data.id].isConnected) {
            this.props.socket.emit('signal-peer1', {id: data.id, SDP: SDP})
            peers[data.id].isConnected = true;
          }
        })
        peers[data.id].peer.on('stream',  (stream) => {
          // got remote video stream, now let's show it in a video tag
          this.setState({outsideStream: stream});
          var video = document.getElementById('video-player')
          video.src = window.URL.createObjectURL(stream)
          video.play()
        })
    })
    // turn off webcam if not streaming
    this.props.socket.on('stop-streaming', () => {
      console.log('stop-streaming')
      outsideStream.getVideoTracks()[0].stop();
      peers = {}; // clear all peers in case we become the streamer again
    })
  }


  render() {

   console.log('checkstates', this.state.webCamAllowed, this.state.jumboShown)


   if(this.state.mobile===true) {
    return null;
   } else {
    return (
      <div className="full-width">
        <div id="jumbo-wrapper">
          <div className="inline toggle-jumbo">Toggle Jumbotron</div>
          <Toggle id="toggle-btn" checked={this.state.jumboShown && this.state.webCamAllowed} onChange={this.toggleVideo.bind(this)}/>
        </div>
        {this.state.jumboShown && this.state.webCamAllowed ? <Video className="full-width" connectVideoToStream={this.connectVideoToStream.bind(this)} /> : ''}
        {this.state.alertWrapper ? <div id="alert-wrapper"><div className="inline" id="allow-camera">Allow camera access to view jumbotron</div><img className="inline up-arrow" src="./webcam_off.png"/></div> : ''}
      </div>
    )
   }
  }
}
export default Jumbotron;
