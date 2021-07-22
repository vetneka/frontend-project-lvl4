import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modalTypes = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

export default (type) => ((type === null) ? null : modalTypes[type]);
