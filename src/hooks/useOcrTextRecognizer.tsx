import React, {useEffect} from 'react';
import MlkitOcr from 'react-native-mlkit-ocr';

const useOcrTextRecognizer = () => {
  const [ocrText, setOcrText] = React.useState<any>(null);
  const [imageUri, setImageUri] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);
  const Extract = async () => {
    await MlkitOcr.detectFromUri(imageUri)
      .then(res => {
        setOcrText(
          res?.map(
            (block: any) => block.lines.map((line: any) => line.text)[0],
          ) as any,
        );
        setImageUri(null);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setOcrText([]);
      });
  };
  useEffect(() => {
    if (imageUri) {
      setOcrText(null);
      setLoading(true);
    }
  }, [imageUri]);

  useEffect(() => {
    if (loading) {
      Extract();
    }
  }, [loading]);

  return {ocrText, loading, setImageUri,setOcrText};
};
export default useOcrTextRecognizer;
