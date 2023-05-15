import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => {
    const noto = state.notification
    console.log(noto)
    return noto
  });


  if (!notification) {
    return null;
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    // backgroundColor: 'blue'
  };

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;
