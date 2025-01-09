import "/styles/main.css";
import { useState } from "react";
import { addElementAtPoint, requestExport } from "@canva/design";
import { upload } from "@canva/asset";
import { Button, Rows, Title, Text, Box, Slider, FileInput } from "@canva/app-ui-kit";

export const App = () => {
  const [image, setImage] = useState(null);
  const [opacityValue, setOpacityValue] = useState(1);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

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
      ctx.globalAlpha = opacityValue; // 设置透明度
      ctx.drawImage(img, 0, 0);
      setImage(canvas.toDataURL());
    };
    img.src = image;
  };

  // 改变透明度
  const changeOpacity = (value) => {
    setOpacityValue(value);
  };

  // 添加到画板
  async function addToDesign() {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.globalAlpha = opacityValue; // 设置透明度
      ctx.drawImage(img, 0, 0);
      setImage(canvas.toDataURL());
    };

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
  }

  return (
    <Rows spacing="2u">
      <Title>镜像翻转迷你程序</Title>
      <FileInput accept={["image/*"]} onDropAcceptedFiles={onFileChange} />
      {image && (
        <>
          <Title>预览图</Title>
          <img src={image} alt="Uploaded" style={{ opacity: opacityValue }} />
          <Rows spacing="2u">
            <Button
              alignment="center"
              ariaLabel="Label text"
              onClick={() => flipImage("horizontal")}
              variant="primary"
            >
              水平翻转
            </Button>
            <Button
              alignment="center"
              ariaLabel="Label text"
              onClick={() => flipImage("vertical")}
              variant="primary"
            >
              垂直翻转
            </Button>
          </Rows>
          <Rows spacing="2u">
            <Text>调整透明度:</Text>
            <Box paddingStart="2u">
              <Slider
                defaultValue={opacityValue}
                max={1}
                min={0}
                step={0.1}
                onChange={changeOpacity}
              />
            </Box>
          </Rows>
          <Button
            alignment="center"
            ariaLabel="Label text"
            onClick={addToDesign}
            variant="primary"
          >
            添加到页面
          </Button>
          <Button
            alignment="center"
            ariaLabel="Label text"
            onClick={exportImage}
            variant="primary"
          >
            导出图片
          </Button>
        </>
      )}
    </Rows>
  );
};
