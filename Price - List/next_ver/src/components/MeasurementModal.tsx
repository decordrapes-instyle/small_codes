import { useState } from 'react';
import { X, Plus, Trash2, Share2 } from 'lucide-react';

interface MeasurementItem {
  id: string;
  productCode: string;
  width: number;
  height: number;
  unit: Unit;
}

interface SendMeasurementModalProps {
  onClose: () => void;
  logoUrl?: string;
  initialProductCode?: string;
  initialProductName?: string;
}

type Unit = 'ft' | 'inch' | 'cm' | 'mm' | 'm';

export default function SendMeasurementModal({ onClose, logoUrl = 'https://res.cloudinary.com/dmiwq3l2s/image/upload/v1764322049/zrsn9atwtn42z5ivn4d8.svg' }: SendMeasurementModalProps) {
  const [measurements, setMeasurements] = useState<MeasurementItem[]>([]);
  const [productCode, setProductCode] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<Unit>('ft');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const addMeasurement = () => {
    if (!productCode.trim()) {
      alert('Please enter a product code');
      return;
    }

    const w = parseFloat(width);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      alert('Please enter valid width and height values');
      return;
    }

    const newMeasurement: MeasurementItem = {
      id: Date.now().toString(),
      productCode: productCode.trim(),
      width: w,
      height: h,
      unit
    };

    setMeasurements([...measurements, newMeasurement]);
    setWidth('');
    setHeight('');
    setProductCode('');
  };

  const removeMeasurement = (id: string) => {
    setMeasurements(measurements.filter(m => m.id !== id));
  };

  const generateImageDataUrl = async (): Promise<string> => {
    return new Promise((resolve, _reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      // Canvas dimensions
      const width = 800;
      const padding = 40;
      const itemHeight = 80;
      const headerHeight = 140;
      const footerHeight = 40;
      const height = headerHeight + (measurements.length * itemHeight) + footerHeight + (padding * 2);
      
      canvas.width = width;
      canvas.height = height;
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#EFF6FF');
      gradient.addColorStop(1, '#F9FAFB');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Header section background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(padding, padding, width - (padding * 2), headerHeight);
      
      // Load and draw logo SVG
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        // Calculate logo dimensions maintaining aspect ratio
        const logoHeight = 48;
        const logoWidth = (img.width / img.height) * logoHeight;
        
        // Draw logo
        ctx.drawImage(img, padding + 20, padding + 20, logoWidth, logoHeight);
        
        // Title
        ctx.fillStyle = '#0284C7';
        ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
        ctx.fillText('Measurement', padding + 20, padding + 90);
        
        // Item count
        ctx.fillStyle = '#6B7280';
        ctx.font = '16px system-ui, -apple-system, sans-serif';
        ctx.fillText(`${measurements.length} item${measurements.length !== 1 ? 's' : ''} added`, padding + 20, padding + 115);
        
        // Items section
        let yOffset = padding + headerHeight + 20;
        
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
        ctx.fillText('Items:', padding + 20, yOffset);
        yOffset += 30;
        
        measurements.forEach((m, index) => {
          // Item background
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(padding + 20, yOffset, width - (padding * 2) - 40, itemHeight - 10);
          
          // Item border
          ctx.strokeStyle = '#E5E7EB';
          ctx.lineWidth = 1;
          ctx.strokeRect(padding + 20, yOffset, width - (padding * 2) - 40, itemHeight - 10);
          
          // Item number and product code
          ctx.fillStyle = '#1F2937';
          ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
          ctx.fillText(`#${index + 1} - ${m.productCode}`, padding + 35, yOffset + 30);
          
          // Measurements
          ctx.fillStyle = '#6B7280';
          ctx.font = '16px system-ui, -apple-system, sans-serif';
          ctx.fillText(`${m.width} ${m.unit} × ${m.height} ${m.unit}`, padding + 35, yOffset + 55);
          
          yOffset += itemHeight;
        });
        
        resolve(canvas.toDataURL('image/png'));
      };
      
      img.onerror = () => {
        // Fallback: draw without logo if image fails to load
        console.warn('Logo failed to load, generating image without logo');
        
        // Draw fallback logo placeholder
        ctx.fillStyle = '#0EA5E9';
        ctx.fillRect(padding + 20, padding + 20, 60, 48);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('M', padding + 50, padding + 44);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        
        // Title
        ctx.fillStyle = '#0284C7';
        ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
        ctx.fillText('Measurement', padding + 20, padding + 90);
        
        // Item count
        ctx.fillStyle = '#6B7280';
        ctx.font = '16px system-ui, -apple-system, sans-serif';
        ctx.fillText(`${measurements.length} item${measurements.length !== 1 ? 's' : ''} added`, padding + 20, padding + 115);
        
        // Items section
        let yOffset = padding + headerHeight + 20;
        
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
        ctx.fillText('Items:', padding + 20, yOffset);
        yOffset += 30;
        
        measurements.forEach((m, index) => {
          // Item background
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(padding + 20, yOffset, width - (padding * 2) - 40, itemHeight - 10);
          
          // Item border
          ctx.strokeStyle = '#E5E7EB';
          ctx.lineWidth = 1;
          ctx.strokeRect(padding + 20, yOffset, width - (padding * 2) - 40, itemHeight - 10);
          
          // Item number and product code
          ctx.fillStyle = '#1F2937';
          ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
          ctx.fillText(`#${index + 1} - ${m.productCode}`, padding + 35, yOffset + 30);
          
          // Measurements
          ctx.fillStyle = '#6B7280';
          ctx.font = '16px system-ui, -apple-system, sans-serif';
          ctx.fillText(`${m.width} ${m.unit} × ${m.height} ${m.unit}`, padding + 35, yOffset + 55);
          
          yOffset += itemHeight;
        });
        
        resolve(canvas.toDataURL('image/png'));
      };
      
      img.src = logoUrl;
    });
  };

  const shareAsImage = async () => {
    if (measurements.length === 0) {
      alert('Please add at least one measurement');
      return;
    }

    try {
      const dataUrl = await generateImageDataUrl();
      
      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'measurement-request.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'Measurement',
            text: `I have ${measurements.length} measurement(s) to share`
          });
        } catch (err) {
          if ((err as Error).name !== 'AbortError') {
            // Fallback to download
            const link = document.createElement('a');
            link.download = 'measurement-request.png';
            link.href = dataUrl;
            link.click();
          }
        }
      } else {
        // Fallback to download
        const link = document.createElement('a');
        link.download = 'measurement-request.png';
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center rounded-t-xl z-10">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Send Measurements</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-200">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <img
                src={logoUrl}
                alt="Logo"
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback to placeholder if logo fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-sky-600">Measurement</h3>
                <p className="text-xs text-gray-500 mt-1">{measurements.length} item{measurements.length !== 1 ? 's' : ''} added</p>
              </div>
            </div>

            {measurements.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-bold text-gray-700 mb-3">Items:</div>
                {measurements.map((m, index) => (
                  <div key={m.id} className="flex justify-between items-start bg-white rounded-lg p-3 text-sm border border-gray-200">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 truncate">#{index + 1} - {m.productCode}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {m.width} {m.unit} × {m.height} {m.unit}
                      </div>
                    </div>
                    <button
                      onClick={() => removeMeasurement(m.id)}
                      className="text-red-500 hover:text-red-700 transition-colors ml-3 flex-shrink-0 p-1"
                      aria-label="Remove measurement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 bg-gray-50 rounded-xl p-3 sm:p-4">
            <h4 className="font-bold text-gray-800 text-sm sm:text-base">Add Measurement</h4>

            <div className="relative">
              <input
                type="text"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                onFocus={() => setFocusedField('productCode')}
                onBlur={() => setFocusedField(null)}
                onKeyPress={(e) => e.key === 'Enter' && addMeasurement()}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm peer"
                placeholder=" "
              />
              <label className={`absolute left-3 sm:left-4 transition-all duration-200 pointer-events-none ${
                focusedField === 'productCode' || productCode
                  ? '-top-2 text-xs bg-gray-50 px-1 text-sky-600 font-semibold'
                  : 'top-2 sm:top-3 text-sm text-gray-500'
              }`}>
                Product Code
              </label>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  onFocus={() => setFocusedField('width')}
                  onBlur={() => setFocusedField(null)}
                  onKeyPress={(e) => e.key === 'Enter' && addMeasurement()}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm peer"
                  placeholder=" "
                />
                <label className={`absolute left-2 sm:left-3 transition-all duration-200 pointer-events-none ${
                  focusedField === 'width' || width
                    ? '-top-2 text-xs bg-gray-50 px-1 text-sky-600 font-semibold'
                    : 'top-2 sm:top-3 text-xs sm:text-sm text-gray-500'
                }`}>
                  Width
                </label>
              </div>

              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  onFocus={() => setFocusedField('height')}
                  onBlur={() => setFocusedField(null)}
                  onKeyPress={(e) => e.key === 'Enter' && addMeasurement()}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm peer"
                  placeholder=" "
                />
                <label className={`absolute left-2 sm:left-3 transition-all duration-200 pointer-events-none ${
                  focusedField === 'height' || height
                    ? '-top-2 text-xs bg-gray-50 px-1 text-sky-600 font-semibold'
                    : 'top-2 sm:top-3 text-xs sm:text-sm text-gray-500'
                }`}>
                  Height
                </label>
              </div>

              <div className="relative">
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  onFocus={() => setFocusedField('unit')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm appearance-none bg-white"
                >
                  <option value="ft">ft</option>
                  <option value="inch">in</option>
                  <option value="m">m</option>
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                </select>
                <label className="absolute -top-2 left-2 sm:left-3 text-xs bg-gray-50 px-1 text-sky-600 font-semibold pointer-events-none">
                  Unit
                </label>
              </div>
            </div>

            <button
              onClick={addMeasurement}
              className="w-full bg-sky-500 text-white px-4 py-2.5 sm:py-3 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Measurement
            </button>
          </div>

          {measurements.length > 0 && (
            <div className="mt-4 sm:mt-6">
              <button
                onClick={shareAsImage}
                className="w-full bg-green-600 text-white px-6 py-2.5 sm:py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-semibold shadow-lg text-sm sm:text-base"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                Send Measurements
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}