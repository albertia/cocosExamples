


PROJECT_DIR=build/ios/proj
PROJECT_NAME=MultiverseOfCandy

cd $(dirname $0)
BASE_DIR=$(pwd)
echo $BASE_DIR

OUT_DIR=${BASE_DIR}/out

if [[ -d ${OUT_DIR} ]]; then
  rm -rf "${OUT_DIR}"
fi

mkdir -p "${OUT_DIR}"

cd ${BASE_DIR}/${PROJECT_DIR}


echo "xcodebuild clean archive"
# sleep 5

xcodebuild clean archive -scheme ${PROJECT_NAME} \
                         -configuration Release \
                         -archivePath "${OUT_DIR}/${PROJECT_NAME}.xcarchive" \
                         -UseModernBuildSystem=YES \
                         CODE_SIGN_STYLE="Manual" \
                         PROVISIONING_PROFILE_SPECIFIER="match InHouse com.zeptolab.*" \
                         DEVELOPMENT_TEAM="X227K956K8" \
                         CODE_SIGN_IDENTITY="iPhone Distribution: ZeptoLab UK Limited"

echo "xcodebuild"

# sleep 10

echo "${BASE_DIR}/iosExportOptions.plist"
cat "${BASE_DIR}/iosExportOptions.plist"


xcodebuild -exportArchive \
           -archivePath "${OUT_DIR}/${PROJECT_NAME}.xcarchive" \
           -exportPath "${OUT_DIR}/export" \
           -exportOptionsPlist "${BASE_DIR}/iosExportOptions.plist"


open "${OUT_DIR}/export"
