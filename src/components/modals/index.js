import AddChannel from './AddChannel.jsx';

const modalTypes = {
  adding: AddChannel,
};

export default (type) => ((type === null) ? null : modalTypes[type]);
