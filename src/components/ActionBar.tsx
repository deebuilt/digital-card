import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button, Dropdown, App as AntApp } from 'antd';
import type { MenuProps } from 'antd';
import {
  LinkOutlined,
  DownloadOutlined,
  QrcodeOutlined,
  IdcardOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import QRCode from 'qrcode';
import { CardData, isBusinessStyle, isHandoutStyle } from '@/types/card';
import { getShareableUrl } from '@/lib/share';
import { downloadVCard } from '@/lib/vcard';
import { getDimensions } from '@/lib/print';
import { exportWebImage, exportPrintImage } from '@/lib/export';
import QrModal from './QrModal';
import PrintCard from './PrintCard';
import { ShareAppModal } from '@/components/opsette-share';

interface ActionBarProps {
  card: CardData;
  cardRef: React.RefObject<HTMLDivElement>;
  onSave: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ card, cardRef, onSave }) => {
  const [qrOpen, setQrOpen] = useState(false);
  const [shareAppOpen, setShareAppOpen] = useState(false);
  const [captureContainer, setCaptureContainer] = useState<HTMLDivElement | null>(null);
  const printCardRef = useRef<HTMLDivElement>(null);
  const { message } = AntApp.useApp();
  const dims = getDimensions(card.cardSize);
  const isBusiness = isBusinessStyle(card.cardStyle);
  const isHandout = isHandoutStyle(card.cardStyle);
  // Print-quality export is meaningful for anything that has a defined trim
  // size — both business cards and handouts. Contact cards are share-only.
  const printableForExport = isBusiness || isHandout;

  const requireName = (): boolean => {
    if (!card.fullName) {
      message.error('Enter a name first');
      return false;
    }
    return true;
  };

  const requireHeadline = (): boolean => {
    if (!card.headline) {
      message.error('Enter a headline first');
      return false;
    }
    return true;
  };

  const copyLink = async () => {
    if (!requireName()) return;
    const url = getShareableUrl(card);
    await navigator.clipboard.writeText(url);
    message.success('Link copied');
  };

  const downloadImageWeb = async () => {
    if (!cardRef.current) return;
    try {
      await exportWebImage(cardRef.current, `${card.fullName || card.headline || 'card'}.png`);
      message.success('Image saved');
    } catch {
      message.error('Export failed');
    }
  };

  const downloadImagePrint = async () => {
    if (!printableForExport) {
      message.info('Print-quality export is only available for business cards and handouts');
      return;
    }
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-99999px';
    container.style.top = '0';
    document.body.appendChild(container);
    setCaptureContainer(container);
    try {
      await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));
      const node = printCardRef.current;
      if (!node) throw new Error('print card not mounted');
      await exportPrintImage(node, `${card.fullName || card.headline || 'card'}-print.png`);
      message.success('Print-quality image saved');
    } catch {
      message.error('Export failed');
    } finally {
      setCaptureContainer(null);
      if (container.parentNode) container.parentNode.removeChild(container);
    }
  };

  const handleVCard = () => {
    if (!requireName()) return;
    downloadVCard(card);
    message.success('Contact downloaded');
  };

  const handleSave = () => {
    if (isHandout) {
      if (!requireHeadline()) return;
    } else {
      if (!requireName()) return;
    }
    onSave();
    message.success('Saved');
  };

  const handleQr = () => {
    if (!requireName()) return;
    setQrOpen(true);
  };

  const downloadQrOnly = async () => {
    const target = card.ctaUrl || 'https://opsette.io';
    try {
      const color = card.qrColor || card.accentColor || '#2D3748';
      const hex = color.replace('#', '').padEnd(6, '0').slice(0, 6);
      const dataUrl = await QRCode.toDataURL(target, {
        width: 1024,
        margin: 2,
        color: { dark: `#${hex}`, light: '#ffffff' },
        errorCorrectionLevel: 'M',
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${card.headline ? card.headline.replace(/\s+/g, '-').toLowerCase() : 'handout'}-qr.png`;
      a.click();
      message.success('QR saved');
    } catch {
      message.error('QR export failed');
    }
  };

  const exportMenu: MenuProps = {
    items: [
      { key: 'web', icon: <DownloadOutlined />, label: 'Image (web)' },
      {
        key: 'print',
        icon: <DownloadOutlined />,
        label: 'Image (print quality)',
        disabled: !printableForExport,
      },
      ...(isHandout
        ? [
            { type: 'divider' as const },
            { key: 'qr', icon: <QrcodeOutlined />, label: 'Download QR (1024px)' },
          ]
        : []),
    ],
    onClick: ({ key }) => {
      if (key === 'web') downloadImageWeb();
      else if (key === 'print') downloadImagePrint();
      else if (key === 'qr') downloadQrOnly();
    },
  };

  return (
    <>
      {isHandout ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Dropdown menu={exportMenu} trigger={['click']}>
            <Button icon={<DownloadOutlined />} style={{ height: 40 }}>
              Export
            </Button>
          </Dropdown>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            style={{ height: 40 }}
          >
            Save
          </Button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <Button icon={<LinkOutlined />} onClick={copyLink} style={{ height: 40 }}>
            Link
          </Button>
          <Dropdown menu={exportMenu} trigger={['click']}>
            <Button icon={<DownloadOutlined />} style={{ height: 40 }}>
              Export
            </Button>
          </Dropdown>
          <Button icon={<QrcodeOutlined />} onClick={handleQr} style={{ height: 40 }}>
            QR
          </Button>
          <Button icon={<IdcardOutlined />} onClick={handleVCard} style={{ height: 40 }}>
            vCard
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            style={{ height: 40, gridColumn: 'span 2' }}
          >
            Save Card
          </Button>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <Button type="link" size="small" onClick={() => setShareAppOpen(true)} style={{ fontSize: 12 }}>
          Or share the Digital Card app itself →
        </Button>
      </div>

      <QrModal card={card} open={qrOpen} onClose={() => setQrOpen(false)} />
      <ShareAppModal open={shareAppOpen} onClose={() => setShareAppOpen(false)} />

      {captureContainer && createPortal(
        <PrintCard card={card} dimensions={dims} outerRef={printCardRef} />,
        captureContainer,
      )}
    </>
  );
};

export default ActionBar;
