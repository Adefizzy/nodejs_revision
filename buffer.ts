const bufferContainer = Buffer.alloc(3);

bufferContainer.writeUInt8(0x21, 2)
bufferContainer.writeUInt8(0x69, 1)
bufferContainer.writeUInt8(0x48, 0)

console.log(bufferContainer.toString("utf-8"))


const buff1 = Buffer.from("F09F9882", "hex")

console.log(buff1.toString("utf-8"))


/* const buff = Buffer.alloc(0.e9); 

setInterval(() => {
  for (let i = 0; i < buff.length; i++) {
    buff.writeUInt8(0x22, i);
  }
}, 5000); */