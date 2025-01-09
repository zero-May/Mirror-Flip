import "/styles/main.css";
import { useState, useEffect } from "react";
import { addElementAtPoint, requestExport } from "@canva/design";
import { upload } from "@canva/asset";
import {
  Button,
  Rows,
  Title,
  Box,
  Slider,
  FileInput,
  Columns,
  Column,
  Alert,
} from "@canva/app-ui-kit";

export const App = () => {
  const [image, setImage] = useState(null);
  const [imageSrc, setimageSrc] = useState(null);
  const [opacityValue, setOpacityValue] = useState(1);

  // 上传图片
  const onFileChange = (event) => {
    const file = event[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 翻转图片
  const flipImage = (direction) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (direction === "horizontal") {
        ctx.translate(img.width, 0);
        ctx.scale(-1, 1);
      } else {
        ctx.translate(0, img.height);
        ctx.scale(1, -1);
      }
      ctx.drawImage(img, 0, 0);
      setImage(canvas.toDataURL());
    };
    img.src = image;
  };

  // 改变透明度
  const changeOpacity = (value) => {
    setOpacityValue(value);
  };

  // 监听透明度变化
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.globalAlpha = opacityValue; // 设置透明度
      ctx.drawImage(img, 0, 0);
      setImage(canvas.toDataURL());
    };
    img.src = image;
  }, [opacityValue, imageSrc]); // 每次透明度或图片源变化时重新绘制

  // 添加到画板
  async function addToDesign() {
    const result = await upload({
      type: "image",
      mimeType: "image/png",
      url: image,
      thumbnailUrl: image,
      aiDisclosure: "none",
    });

    // 添加到页面
    await addElementAtPoint({
      type: "image",
      ref: result.ref,
      altText: {
        text: "Example image",
        decorative: false,
      },
    });
  }

  // 导出图片
  async function exportImage() {
    const result = await requestExport({
      acceptedFileTypes: ["jpg", "png"],
    });
    console.log(result); // => { status: "complete", title: "My design", exportBlobs: [{ url: "https://example.com/image.png" }] }
    setimageSrc(result.exportBlobs[0].url);
  }

  return (
    <Rows spacing="2u">
      <Title>镜像翻转迷你程序</Title>
      <Title>上传图片：</Title>
      <FileInput accept={["image/*"]} onDropAcceptedFiles={onFileChange} />
      {image && (
        <>
          <Title>预览图</Title>
          <img src={image} alt="Uploaded" style={{ opacity: opacityValue }} />
          <Rows spacing="0">
            <Columns spacing="2u">
              <Column>
                <Button
                  onClick={() => flipImage("horizontal")}
                  variant="secondary"
                >
                  水平翻转
                </Button>
              </Column>
              <Column>
                <Button
                  onClick={() => flipImage("vertical")}
                  variant="secondary"
                >
                  垂直翻转
                </Button>
              </Column>
            </Columns>
          </Rows>
          <Title>调整透明度:</Title>
          <Box paddingStart="0">
            <Slider
              defaultValue={opacityValue}
              max={1}
              min={0}
              step={0.1}
              onChange={changeOpacity}
            />
          </Box>
          <Rows spacing="1u">
            <Columns spacing="1u">
              <Column>
                <Button onClick={addToDesign} variant="secondary">
                  添加到页面
                </Button>
              </Column>
              <Column>
                <Button onClick={exportImage} variant="secondary">
                  导出图片
                </Button>
              </Column>
            </Columns>
          </Rows>
        </>
      )}
      {imageSrc && (
        <>
          <Alert tone="positive">图片导出成功！</Alert>
          <img src={imageSrc} alt="exported" />
        </>
      )}
    </Rows>
  );
};
