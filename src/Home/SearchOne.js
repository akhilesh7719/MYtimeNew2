import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const SearchOne = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="search"
          placeholderTextColor="#545454"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.postContainer}>
        <View style={styles.frame1Style}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/231b/34ca/381e094df363c9be85cd0346a802046a?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TLdX1yu8kkrjT-uHR~spKqrPJvroHTCCCHGVtYp6dzrC-nQmNAduckEonNS0LJuuNSHwfLtYoIM6kL45iEmqiofkchm5Jh6DU7138yzbFnHPaT6RZlLodBHN69nRd-f1dUh6ih-6EhiPfd6Vhes4Jgn9PGPEdQNWYllPA~2SrttatWVyprJDnk899QO2byT8lgHnCU7kkMbOlbIpCwwJnLvkoK0MX9lwndNk2ZTPbjouzbfsMjeObqFwKZU~Iou5982XjjL13qkQOMl76Scv~GNKJ6Aw8A-shoTuBl0GBq7bt~EnHUN74~XzaQ6jy~9HdOL-gqW9TvMJR76KUs-i9w__',
            }}
          />

          <Image
            style={styles.image2}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/4886/0379/78a21f939ed8cf8354d385cf34a434b1?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Apl-lKsbWCC7qbQcu6TyHj~8UggqOeyA~msCtEVLuSnhR9~a8yoPjcm6F1f20XW4bK-gp24WVGS8mUnPlrLJVF~tvSlEZtfKa~vQJnkooku~Jr40jCknQR7TPDwwAhqkTLpDtkgDZX2bV4uRwG2ZZ9xmAOaG7HlDE3ppAyKFQFitIjr8CLl-1koFKt7Yk-sVPR1n6lLDzju6zdZn3OoJ71liRH1dLDJ-aJYc2v5AAvFIgzpTalXfs3SnWlHx6fyLGv-ljFCG9z7YBGLHdSfm5~FyI2GlrNB3mWXc36r74vLQQZT23oSfVmkTFYZZzKGjF3gyL13tNkMdlS1VUobZjA__',
            }}
          />

          <Image
            style={styles.image3}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/01b0/04d1/92549a4ae2457e59b67eecf86aab711c?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aD-IqTcFycDHSl1YzPQAfHITf7i3F3g-1MzW5~Iq7qBC9~85H5EcVecvuQzVIWw7NNlXY-1PwESFUOtUcsTE7FGk4OkFXD9WuP0WsPfzvWyZbP66EhF2i~czEkDZ22GnW-2D~svb3WqwPuDeVdiumH4IPp-K8jTVbHRSm~fBIGt9P75SpficjQqMftASaIf~jL8OXrWCWizofAmrR-OfIxA7I7J62Dl1GMujTd48KgjwqMjQB3dQkHvwmTCzWxn93e0zM76d7QwmUGsyLgeii3lDbfv8w3dduYb8M8ayqyBML1r4-ubokfCUyYSo2M1wlAkUCyritQYLg1Z-BsdGbA__',
            }}
          />
        </View>

        <View style={styles.frame2}>
          <Image
            style={styles.frame2Image}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/231b/34ca/381e094df363c9be85cd0346a802046a?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TLdX1yu8kkrjT-uHR~spKqrPJvroHTCCCHGVtYp6dzrC-nQmNAduckEonNS0LJuuNSHwfLtYoIM6kL45iEmqiofkchm5Jh6DU7138yzbFnHPaT6RZlLodBHN69nRd-f1dUh6ih-6EhiPfd6Vhes4Jgn9PGPEdQNWYllPA~2SrttatWVyprJDnk899QO2byT8lgHnCU7kkMbOlbIpCwwJnLvkoK0MX9lwndNk2ZTPbjouzbfsMjeObqFwKZU~Iou5982XjjL13qkQOMl76Scv~GNKJ6Aw8A-shoTuBl0GBq7bt~EnHUN74~XzaQ6jy~9HdOL-gqW9TvMJR76KUs-i9w__',
            }}
          />
        </View>

        <View style={styles.frame1Style}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/231b/34ca/381e094df363c9be85cd0346a802046a?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TLdX1yu8kkrjT-uHR~spKqrPJvroHTCCCHGVtYp6dzrC-nQmNAduckEonNS0LJuuNSHwfLtYoIM6kL45iEmqiofkchm5Jh6DU7138yzbFnHPaT6RZlLodBHN69nRd-f1dUh6ih-6EhiPfd6Vhes4Jgn9PGPEdQNWYllPA~2SrttatWVyprJDnk899QO2byT8lgHnCU7kkMbOlbIpCwwJnLvkoK0MX9lwndNk2ZTPbjouzbfsMjeObqFwKZU~Iou5982XjjL13qkQOMl76Scv~GNKJ6Aw8A-shoTuBl0GBq7bt~EnHUN74~XzaQ6jy~9HdOL-gqW9TvMJR76KUs-i9w__',
            }}
          />

          <Image
            style={styles.image2}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/4886/0379/78a21f939ed8cf8354d385cf34a434b1?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Apl-lKsbWCC7qbQcu6TyHj~8UggqOeyA~msCtEVLuSnhR9~a8yoPjcm6F1f20XW4bK-gp24WVGS8mUnPlrLJVF~tvSlEZtfKa~vQJnkooku~Jr40jCknQR7TPDwwAhqkTLpDtkgDZX2bV4uRwG2ZZ9xmAOaG7HlDE3ppAyKFQFitIjr8CLl-1koFKt7Yk-sVPR1n6lLDzju6zdZn3OoJ71liRH1dLDJ-aJYc2v5AAvFIgzpTalXfs3SnWlHx6fyLGv-ljFCG9z7YBGLHdSfm5~FyI2GlrNB3mWXc36r74vLQQZT23oSfVmkTFYZZzKGjF3gyL13tNkMdlS1VUobZjA__',
            }}
          />

          <Image
            style={styles.image3}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/01b0/04d1/92549a4ae2457e59b67eecf86aab711c?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aD-IqTcFycDHSl1YzPQAfHITf7i3F3g-1MzW5~Iq7qBC9~85H5EcVecvuQzVIWw7NNlXY-1PwESFUOtUcsTE7FGk4OkFXD9WuP0WsPfzvWyZbP66EhF2i~czEkDZ22GnW-2D~svb3WqwPuDeVdiumH4IPp-K8jTVbHRSm~fBIGt9P75SpficjQqMftASaIf~jL8OXrWCWizofAmrR-OfIxA7I7J62Dl1GMujTd48KgjwqMjQB3dQkHvwmTCzWxn93e0zM76d7QwmUGsyLgeii3lDbfv8w3dduYb8M8ayqyBML1r4-ubokfCUyYSo2M1wlAkUCyritQYLg1Z-BsdGbA__',
            }}
          />
        </View>

        <View style={styles.lastframe}>
          <Image
            style={styles.lastImage}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/231b/34ca/381e094df363c9be85cd0346a802046a?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TLdX1yu8kkrjT-uHR~spKqrPJvroHTCCCHGVtYp6dzrC-nQmNAduckEonNS0LJuuNSHwfLtYoIM6kL45iEmqiofkchm5Jh6DU7138yzbFnHPaT6RZlLodBHN69nRd-f1dUh6ih-6EhiPfd6Vhes4Jgn9PGPEdQNWYllPA~2SrttatWVyprJDnk899QO2byT8lgHnCU7kkMbOlbIpCwwJnLvkoK0MX9lwndNk2ZTPbjouzbfsMjeObqFwKZU~Iou5982XjjL13qkQOMl76Scv~GNKJ6Aw8A-shoTuBl0GBq7bt~EnHUN74~XzaQ6jy~9HdOL-gqW9TvMJR76KUs-i9w__',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    //padding:10
  },
  searchContainer: {
    width: 353,
    height: 45,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#C1C1C1',
    marginTop: 33,
    alignItems: 'flex-start',
  },
  searchInput: {
    fontFamily: 'Open Sans',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 17.7,
    width: 50,
    height: 40,
    marginLeft: 25,
  },
  postContainer: {
    //backgroundColor:'black',
    width: 353,
    height: 525,
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame1Style: {
    //backgroundColor:'green',
    width: 353,
    height: 95,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 125,
    height: 95,
  },
  image2: {
    width: 101,
    height: 95,
    resizeMode: 'stretch',
  },
  image3: {
    width: 99,
    height: 95,
  },
  frame2: {
    width: 353,
    height: 173,
    marginTop: 10,
    backgroundColor: 'green',
    marginBottom: 10,
  },
  frame2Image: {
    width: 353,
    height: 173,
  },
  lastframe: {
    width: 353,
    height: 126,
    marginTop: 10,
  },
  lastImage: {
    width: 353,
    height: 126,
  },
});
