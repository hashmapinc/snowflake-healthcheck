export PKG_DIR="python"

rm -rf ${PKG_DIR} && mkdir -p ${PKG_DIR}

pip install -r requirements.txt --no-deps -t ${PKG_DIR}