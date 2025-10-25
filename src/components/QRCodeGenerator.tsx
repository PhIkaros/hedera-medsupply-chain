import { QRCodeSVG } from "qrcode.react";
import { Card } from "@/components/ui/card";

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
}

const QRCodeGenerator = ({ value, size = 120 }: QRCodeGeneratorProps) => {
  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-primary/30 inline-block">
      <QRCodeSVG
        value={value}
        size={size}
        bgColor="transparent"
        fgColor="hsl(165 100% 50%)"
        level="H"
        includeMargin={false}
      />
    </Card>
  );
};

export default QRCodeGenerator;
