import { createContext, useReducer, useContext } from 'react'


const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
        return 'too short anecdote, length must be 5 or more'
    case "VOTE":
        console.log('voteState', state)
        console.log('action', action)
        console.log('actionMessage', action.message.content)
        console.log('state2', state)

        return `anecdote '${action.message.content}' voted`;
    case "ADD":
      console.log('voteState', state)
      console.log('action', action)
      console.log('actionMessage', action.message.content)
      console.log('actionMessage2', action.message)
      console.log('state2', state)

      return `anecdote '${action.message}' added`;
    case "CLEAR":
        return ''
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

// export const useNotificationValue = (message) => {
//   const notificationAndDispatch = useContext(NotificationContext)
//   return notificationAndDispatch[message]
// }

// export const useNotificationDispatch = (type) => {
//   const notificationAndDispatch = useContext(NotificationContext)
//   return notificationAndDispatch[type]
// }

export const useNotificationMessage = () => {
  const [notification] = useContext(NotificationContext);
  return notification;
}

export const useNotificationDispatch = () => {
  const [, notificationDispatch] = useContext(NotificationContext);

  const dispatchAction = (type, message) => {
    console.log('testAction:', type);
    console.log('testMessage:', message);

    notificationDispatch({ type, message });
  };

  return dispatchAction;
};




export default NotificationContext
