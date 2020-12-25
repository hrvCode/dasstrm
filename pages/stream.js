import Head from 'next/head';
import styles from '../styles/Stream.module.css';

import VideContainer from '../components/video/VideoContainer';
import ChatContainer from '../components/chat/ChatContainer';

export default function Stream() {
  return (
    <div className={styles.container}>
      <video
      width={"75%"} height={"100%"}>
        <source src="https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4
"  controls="controls"/>
      </video>

      <div style={{ width:"25%",  height: "100%"}}>
        <ChatContainer />
      </div>
    </div>
  );
}
