import school1 from '../assets/school1.jpg';
import school2 from '../assets/school2.jpg';
import school3 from '../assets/school3.jpg';

const BackgroundWrapper = ({ children, type, className = "" }) => {
  const getBackgroundImage = () => {
    switch (type) {
      case 'auth':
        return school2;
      case 'student':
        return school1;
      case 'teacher':
        return school3;
      case 'footer':
        return school2;
      default:
        return null;
    }
  };

  const backgroundImage = getBackgroundImage();
  
  const style = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {};

  return (
    <div 
      className={className}
      style={style}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;