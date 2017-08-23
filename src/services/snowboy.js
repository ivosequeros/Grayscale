import {default as record} from 'node-record-lpcm16';
import {Detector, Models} from 'snowboy';

module.exports = class Snowboy {
    static enable() {
        const models = new Models();
        
        models.add({
          file: 'resources/snowboy.umdl',
          sensitivity: '0.5',
          hotwords : 'snowboy'
        });
        
        const detector = new Detector({
          resource: "resources/common.res",
          models: models,
          audioGain: 2.0
        });
        
        detector.on('silence', function () {
          console.log('silence');
        });
        
        detector.on('sound', function (buffer) {
          // <buffer> contains the last chunk of the audio that triggers the "sound"
          // event. It could be written to a wav stream.
          console.log('sound');
        });
        
        detector.on('error', function () {
          console.log('error');
        });
        
        detector.on('hotword', function (index, hotword, buffer) {
          // <buffer> contains the last chunk of the audio that triggers the "hotword"
          // event. It could be written to a wav stream. You will have to use it
          // together with the <buffer> in the "sound" event if you want to get audio
          // data after the hotword.
          console.log(buffer);
          console.log('hotword', index, hotword);
        });
        
        const mic = record.start({
          threshold: 0,
          verbose: true
        });
        
        mic.pipe(detector);
    }
}