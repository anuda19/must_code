// class PcmCaptureProcessor extends AudioWorkletProcessor {
//   constructor() {
//     super();

//     // 2048 samples at 16 kHz = 128 ms per message.
//     this.chunkSize = 2048;
//     this.buffer = new Float32Array(this.chunkSize);
//     this.offset = 0;
//   }

//   process(inputs, outputs) {
//     const input = inputs[0]?.[0];

//     // Never send captured microphone audio to the speakers.
//     for (const channel of outputs[0] ?? []) {
//       channel.fill(0);
//     }

//     if (!input) return true;

//     let position = 0;

//     while (position < input.length) {
//       const count = Math.min(
//         this.chunkSize - this.offset,
//         input.length - position
//       );

//       this.buffer.set(
//         input.subarray(position, position + count),
//         this.offset
//       );

//       this.offset += count;
//       position += count;

//       if (this.offset === this.chunkSize) {
//         const pcm = new Int16Array(this.chunkSize);

//         for (let i = 0; i < this.chunkSize; i++) {
//           const sample = Math.max(-1, Math.min(1, this.buffer[i]));

//           pcm[i] = sample < 0
//             ? sample * 32768
//             : sample * 32767;
//         }

//         // Transfer ownership instead of copying the PCM buffer.
//         this.port.postMessage(pcm.buffer, [pcm.buffer]);

//         this.buffer = new Float32Array(this.chunkSize);
//         this.offset = 0;
//       }
//     }

//     return true;
//   }
// }

// // registerProcessor("pcm-capture-processor", PcmCaptureProcessor);
// class PcmCaptureProcessor extends AudioWorkletProcessor {
//   constructor() {
//     super();

//     // 512 samples at 16 kHz = 32 ms per chunk.
//     this.chunkSize = 640;
//     this.buffer = new Float32Array(this.chunkSize);
//     this.offset = 0;
//   }

//   process(inputs, outputs) {
//     const input = inputs[0]?.[0];

//     // Never send microphone audio to speakers.
//     for (const channel of outputs[0] ?? []) {
//       channel.fill(0);
//     }

//     if (!input) return true;

//     let position = 0;

//     while (position < input.length) {
//       const count = Math.min(
//         this.chunkSize - this.offset,
//         input.length - position,
//       );

//       this.buffer.set(
//         input.subarray(position, position + count),
//         this.offset,
//       );

//       this.offset += count;
//       position += count;

//       if (this.offset === this.chunkSize) {
//         const pcm = new Int16Array(this.chunkSize);

//         for (let i = 0; i < this.chunkSize; i++) {
//           const sample = Math.max(-1, Math.min(1, this.buffer[i]));

//           pcm[i] =
//             sample < 0
//               ? sample * 32768
//               : sample * 32767;
//         }

//         this.port.postMessage(pcm.buffer, [pcm.buffer]);

//         this.buffer = new Float32Array(this.chunkSize);
//         this.offset = 0;
//       }
//     }

//     return true;
//   }
// }

// registerProcessor("pcm-capture-processor", PcmCaptureProcessor);

// Place this file at: /public/pcm-capture-processor.js

class PcmCaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();

    // 640 samples at 16 kHz = 40 ms per chunk (5 render quanta of 128 frames).
    this.chunkSize = 640;
    this.buffer = new Float32Array(this.chunkSize);
    this.offset = 0;
  }

  process(inputs, outputs) {
    // Never send microphone audio to speakers.
    for (const channel of outputs[0] ?? []) {
      channel.fill(0);
    }

    const input = inputs[0]?.[0];
    if (!input) return true;

    let position = 0;

    while (position < input.length) {
      const count = Math.min(
        this.chunkSize - this.offset,
        input.length - position,
      );

      this.buffer.set(input.subarray(position, position + count), this.offset);

      this.offset += count;
      position += count;

      if (this.offset === this.chunkSize) {
        const pcm = new Int16Array(this.chunkSize);

        for (let i = 0; i < this.chunkSize; i++) {
          const sample = Math.max(-1, Math.min(1, this.buffer[i]));
          pcm[i] = sample < 0 ? sample * 32768 : sample * 32767;
        }

        // Transfer the buffer (zero-copy) to the main thread.
        this.port.postMessage(pcm.buffer, [pcm.buffer]);

        // Reuse the Float32Array; only reset the write offset (no GC churn).
        this.offset = 0;
      }
    }

    return true;
  }
}

registerProcessor("pcm-capture-processor", PcmCaptureProcessor);