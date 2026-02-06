"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, FiTrendingUp, FiActivity, FiDatabase, FiUsers, FiFileText, 
  FiGrid, FiSettings, FiDollarSign, FiCreditCard, FiRefreshCw, FiSend, 
  FiShield, FiMessageSquare, FiBook, FiFlag, FiHelpCircle, FiHeadphones, 
  FiAlertCircle, FiServer, FiUserCheck, FiFile, FiHardDrive, FiChevronDown, FiX, FiLogOut, 
  FiCpu,
  FiCode,
  FiPercent,
  FiLayout,
  FiKey
} from 'react-icons/fi';
import { LuBrain } from 'react-icons/lu';
import { SiHomeassistantcommunitystore } from 'react-icons/si';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

export default function SidebarSuperAdmin({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleAccordion = (id: string) => {
    setOpenMenus(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const SUPER_ADMIN_MENU: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard Pusat',
    icon: <FiHome />,
    children: [
      { id: 'ecosystem-status', label: 'Status Ekosistem', icon: <FiTrendingUp />, path: '/sss/status' },
      { id: 'transaction-monitoring', label: 'Monitoring Transaksi', icon: <FiActivity />, path: '/sss/transactions' },
      { id: 'system-health', label: 'System Health', icon: <FiDatabase />, path: '/sss/health' }
    ]
  },
  {
    id: 'partnership',
    label: 'Manajemen Sekolah',
    icon: <FiGrid />,
    children: [
      { id: 'school-directory', label: 'Direktori Sekolah', icon: <FiUsers />, path: '/sss/schools' },
      { id: 'verification', label: 'Verifikasi Sekolah Baru', icon: <FiFileText />, path: '/sss/verification' },
      { id: 'license-settings', label: 'Manajemen Lisensi & Paket', icon: <FiSettings />, path: '/sss/licenses' },
      { id: 'tenant-config', label: 'Whitelabel & Branding', icon: <FiLayout />, path: '/sss/branding' }
    ]
  },
  {
    id: 'financial',
    label: 'SoPay & Finansial',
    icon: <FiDollarSign />,
    children: [
      { id: 'gateway-config', label: 'Payment Gateway Info', icon: <FiCreditCard />, path: '/sss/gateway' },
      { id: 'fee-config', label: 'Platform Fee (MDR)', icon: <FiPercent />, path: '/sss/fees' },
      { id: 'reconciliation', label: 'Rekonsiliasi Bank', icon: <FiRefreshCw />, path: '/sss/reconciliation' },
      { id: 'settlement', label: 'Settlement/Payout Sekolah', icon: <FiSend />, path: '/sss/payout' },
      { id: 'fraud-alert', label: 'Fraud Detection', icon: <FiShield />, path: '/sss/fraud' }
    ]
  },
  {
    id: 'ai-management',
    label: 'SoSchool AI Control',
    icon: <LuBrain />, // Pastikan import LuBrain dari react-icons/lu
    children: [
      { id: 'ai-usage', label: 'Monitoring Token AI', icon: <FiActivity />, path: '/sss/usage' },
      { id: 'ai-model-config', label: 'Model Configuration', icon: <FiCpu />, path: '/sss/config' },
      { id: 'prompt-lab', label: 'Global Prompt Engineering', icon: <FiCode />, path: '/sss/prompts' }
    ]
  },
  {
    id: 'content-community',
    label: 'Konten & Moderasi',
    icon: <FiMessageSquare />,
    children: [
      { id: 'global-feed', label: 'Moderasi Feed Global', icon: <FiShield />, path: '/sss/moderation' },
      { id: 'marketplace-control', label: 'Katalog Marketplace', icon: <SiHomeassistantcommunitystore />, path: '/sss/marketplace' },
      { id: 'question-bank', label: 'Bank Soal Nasional', icon: <FiBook />, path: '/sss/questions' },
      { id: 'global-banner', label: 'Banner & Broadcast', icon: <FiFlag />, path: '/sss/banners' }
    ]
  },
  {
    id: 'support-ticketing',
    label: 'Support & Helpdesk',
    icon: <FiHeadphones />,
    children: [
      { id: 'helpdesk', label: 'Tiket Bantuan', icon: <FiHeadphones />, path: '/sss/helpdesk' },
      { id: 'bug-tracker', label: 'Bug Reports (Dev)', icon: <FiAlertCircle />, path: '/sss/bugs' },
      { id: 'documentation', label: 'Pusat Panduan (Docs)', icon: <FiFileText />, path: '/sss/docs' }
    ]
  },
  {
    id: 'infrastructure',
    label: 'System Infrastructure',
    icon: <FiServer />,
    children: [
      { id: 'internal-users', label: 'Admin & sss Pusat', icon: <FiUserCheck />, path: '/sss/internal-users' },
      { id: 'audit-log', label: 'Audit Log System', icon: <FiFile />, path: '/sss/audit' },
      { id: 'backup-restore', label: 'Backup & Cloud Sync', icon: <FiHardDrive />, path: '/sss/backup' },
      { id: 'api-management', label: 'API Keys & Webhooks', icon: <FiKey />, path: '/sss/api' }
    ]
  }
];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-100 transition-opacity duration-300 lg:hidden 
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`
        fixed lg:relative top-0 left-0 z-100 h-screen w-72 pt-20 lg:pt-24
        bg-white dark:bg-[#0a0f1d] border-r border-slate-200 dark:border-blue-900/20 
        flex flex-col transition-all duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        <button onClick={onClose} className="lg:hidden absolute top-6 right-6 p-2 rounded-xl text-slate-500 dark:text-blue-400 bg-slate-100 dark:bg-blue-500/10">
          <FiX size={20} />
        </button>

        <div className="flex-1 px-4 overflow-y-auto no-scrollbar py-6 space-y-2">
          {SUPER_ADMIN_MENU.map((item) => {
            const isExpanded = openMenus.includes(item.id);
            return (
              <div key={item.id} className="space-y-1">
                {/* Parent Menu */}
                <button 
                  onClick={() => toggleAccordion(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group
                  ${isExpanded ? 'bg-blue-50 dark:bg-blue-500/5 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-blue-100/40 hover:bg-slate-50 dark:hover:bg-blue-800/10'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xl transition-colors ${isExpanded ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-inherit'}`}>
                      {item.icon}
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-wider italic">
                      {item.label}
                    </span>
                  </div>
                  <FiChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Children Menu */}
                <div className={`overflow-hidden transition-all duration-300 space-y-1 ml-4 border-l border-slate-100 dark:border-blue-900/10 pl-2
                  ${isExpanded ? 'max-h-96 opacity-100 py-1' : 'max-h-0 opacity-0'}`}>
                  {item.children?.map((child) => {
                    const isActive = pathname === child.path;
                    return (
                      <Link 
                        key={child.id} 
                        href={child.path || '#'}
                        onClick={() => { if(window.innerWidth < 1024) onClose(); }}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-[10px] font-bold uppercase italic tracking-widest
                        ${isActive 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                          : 'text-slate-500 dark:text-blue-100/30 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-50 dark:hover:bg-blue-500/5'}`}
                      >
                        <span className="text-lg">{child.icon}</span>
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-blue-900/20">
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest italic
            text-red-500/60 dark:text-red-400/60 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-500">
            <FiLogOut size={18} />
            <span>Logout System</span>
          </button>
        </div>
      </aside>
    </>
  );
};
