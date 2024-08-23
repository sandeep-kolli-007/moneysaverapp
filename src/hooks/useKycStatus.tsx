import {useState, useEffect} from 'react';

const useKycStatus = (kycObj: any) => {
  const [kycStatus, setKycStatus] = useState({number: 0, isKyc: false});

  useEffect(() => {
    console.log(kycObj, 'sstt');
    if (kycObj != null && kycObj != undefined) {
      const {isAadharVerified, isBankVerified, isSelfieVerified} = kycObj;
      console.log(isAadharVerified, isBankVerified, isSelfieVerified, 'stst');
      if (isAadharVerified && isBankVerified && isSelfieVerified) {
        setKycStatus({number: 3, isKyc: true});
      } else if (isAadharVerified && isSelfieVerified) {
        setKycStatus({number: 2, isKyc: false});
      } else if (isAadharVerified) {
        setKycStatus({number: 1, isKyc: false});
      } else {
        setKycStatus({number: 0, isKyc: false});
      }
    }
  }, [kycObj]);

  return kycStatus;
};

export default useKycStatus;
