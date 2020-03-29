const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { createSerializer } = require('enzyme-to-json');

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: false,
});
