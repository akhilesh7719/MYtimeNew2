import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const [location, setLocation] = useState(null);
const [permission, setPermission] = useState(null);

useEffect(() => {
  requestLocationPermission();
}, []);

const requestLocationPermission = async () => {
  const permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  if (Platform.OS === 'ios') {
    const permissionStatus = await request(
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    );
    setPermission(permissionStatus);
    if (permissionStatus === RESULTS.GRANTED) {
      getCurrentLocation();
    }
  } else {
    const permissionStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    setPermission(permissionStatus);
    if (permissionStatus === PermissionsAndroid.RESULTS.GRANTED) {
      getCurrentLocation();
    }
  }
};

const getCurrentLocation = () => {
  Geolocation.getCurrentPosition(
    position => {
      setLocation(position);
    },
    error => {
      console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};
