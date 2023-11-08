import Image from 'next/image';
import imgLogo from '@/public/logo.png';
import imgProfile from '@/public/profileImg.png';
import imgRugbyPlayer from '@/public/RugbyPlayer2.png';
import backgroundImage from '@/public/bg.png';

const App = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat-y',
  };

  const linkStyle = {
    flex: 1,
    textAlign: 'center' as const,
    cursor: 'pointer',
  };

  return (
    <div className="app-container" style={{ ...backgroundStyle, paddingLeft: '10%', paddingRight: '10%', paddingTop: '10vh' }}>
      {/* Top Bar */}
      <div className="top-bar" style={{ backgroundColor: 'white', padding: '20px', display: 'flex', alignItems: 'center', borderRadius: '10px' }}>
        <div className="left-image">
          <Image src={imgLogo} alt="logo" height={80}/>
        </div>
        <div className="tabs" style={{ display: 'flex', gap: '20px', flex: 1 }}>
          {/* Insert your tab components here */}
          <span style={linkStyle}>Matches</span>
          <span style={linkStyle}>Pools</span>
          <span style={linkStyle}>Knockout</span>
          <span style={linkStyle}>Predictions</span>
        </div>
        <div className="right-image">
          <Image src={imgProfile} alt="profilePic" height={50}/>
        </div>
      </div>

      {/* Second Box */}
      <div className="second-box" style={{ backgroundColor: 'white', marginTop: '20px', padding: '20px', borderRadius: '10px', display: 'flex' }}>
        <div className="player-image" style={{ flex: 1 }}>
          <img src={imgRugbyPlayer.src} alt="rugbyPlayer2" className="main-image" style={{ width: '100%' }} />
        </div>
        <div className="matches-section" style={{ flex: 2, paddingLeft: '20px' }}>
          {/* Place to insert previous and upcoming matches */}
          {/* Add your content for previous and upcoming matches here */}
        </div>
      </div>
    </div>
  );
};

export default App;
