import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const modalTypes = {
  adding: AddChannel,
  removing: RemoveChannel,
};

export default (type) => ((type === null) ? null : modalTypes[type]);
