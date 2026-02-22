import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Bot, CircleX, EllipsisVertical } from 'lucide-react';
import clsx from 'clsx';
import Markdown from 'react-markdown';
import Swal from 'sweetalert2';
import { getDataByKey } from '@/helpers/GGSheetHelper';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

interface Message {
    role: 'user' | 'bot';
    content: string;
}

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false); // Trạng thái mở cửa sổ chat
    const [showNotif, setShowNotif] = useState(true); // Trạng thái tin nhắn nổi
    const [unreadCount, setUnreadCount] = useState(2); // Giả lập số tin nhắn chưa đọc
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isSettingOpen, setIsSettingOpen] = useState(false)

    const scrollRef = useRef<HTMLDivElement>(null);
    const settingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedMessages = localStorage.getItem('chat_history');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        } else {
            setMessages([{ role: 'bot', content: 'Chào Nhật Khương! Bạn cần hỗ trợ gì không?' }]);
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('chat_history', JSON.stringify(messages));
        }
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingRef.current && !settingRef.current.contains(event.target as Node)) {
                setIsSettingOpen(false);
            }
        };

        if (isSettingOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSettingOpen]);

    const { data, language } = useSelector((state: RootState) => state.google_sheet);
    const t = (key: string) => getDataByKey(data, language, key);

    const handleOpenChat = () => {
        setIsOpen(true);
        setShowNotif(false);
        setUnreadCount(0);
    };

    const handleSendMessage = () => {
        if (!input.trim()) return;

        const userMsg: Message = { role: 'user', content: input };
        const newMessages = [...messages, userMsg];

        setMessages(newMessages);
        setInput('');

        // Giả lập phản hồi từ AI sau 1 giây
        setTimeout(() => {
            const botMsg: Message = { role: 'bot', content: t('c-bot-rep') };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    const handleClearChatHistory = () => {
        if (messages.length === 0) return;
        Swal.fire({
            title: t('c-clear'),
            text: t('c-clear-confirm'),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: t('c-clear-accept')
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('chat_history');
                setMessages([]);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: t('c-clear-suc'),
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    return (
        <div className="fixed bottom-3 lg:bottom-8 right-3 lg:right-6 z-[50] flex flex-col items-end font-sans">

            {/* 1. Cửa sổ Chat chính */}
            <div className={clsx(
                "mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right",
                isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
            )}>
                {/* Header */}
                <div ref={settingRef} className="p-4 bg-sky-600 text-white flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-2">
                        <Bot size={20} className="animate-pulse" />
                        <span className="font-bold text-sm tracking-tight uppercase">{t('c-header')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsSettingOpen(!isSettingOpen)} className="hover:bg-sky-700 p-1 rounded-full transition-colors">
                            <EllipsisVertical size={18} />
                        </button>

                        {isSettingOpen && (
                            <div className="absolute right-12 top-12 bg-white border border-gray-200 rounded-md shadow-lg p-2 w-40">
                                <p className={clsx(
                                    messages.length === 0 ? "text-gray-400 cursor-not-allowed" : "text-sm text-red-700 hover:bg-gray-100 rounded-md p-2 cursor-pointer",
                                )} onClick={handleClearChatHistory}>{t('c-clear')}</p>
                            </div>
                        )}

                        <button onClick={() => setIsOpen(false)} className="hover:bg-sky-700 p-1 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Nội dung chat */}
                <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={clsx(
                            "p-3 rounded-2xl text-sm shadow-sm prose prose-sky max-w-[85%]",
                            msg.role === 'bot'
                                ? "bg-sky-100 rounded-tl-none text-gray-700"
                                : "bg-white border border-gray-200 rounded-tr-none text-gray-800 ml-auto"
                        )}>
                            <Markdown>{msg.content}</Markdown>
                        </div>
                    ))}
                    <div ref={scrollRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t flex gap-2">
                    <div className="relative flex-1 flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder={t('c-placeholder')}
                            className="w-full text-sm bg-gray-100 rounded-full py-2 pl-4 pr-9 outline-none focus:ring-1 focus:ring-sky-500"
                        />

                        {input && (
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={() => setInput('')}
                            >
                                <CircleX size={16} />
                            </button>
                        )}
                    </div>

                    <button className="bg-sky-600 text-white p-2 rounded-full hover:bg-sky-700 transition-all">
                        <Send size={18} onClick={handleSendMessage} />
                    </button>
                </div>
            </div>

            {/* 2. Tin nhắn nổi (Notification Popup) */}
            <div className={clsx(
                "mb-4 relative max-w-[280px] transition-all duration-500",
                !isOpen && showNotif ? "translate-x-0 inline" : "translate-x-10 hidden pointer-events-none"
            )}>
                <div
                    onClick={handleOpenChat}
                    className="bg-white p-4 rounded-xl shadow-xl border border-sky-100 cursor-pointer hover:shadow-2xl transition-shadow pr-10"
                >
                    <p className="text-[10px] font-black text-sky-600 uppercase mb-1 tracking-widest">{t('c-notif-title')}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">Bạn có muốn xem các dự án **Revit API** mới nhất của tôi?</p>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); setShowNotif(false); }}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                    <X size={14} />
                </button>
            </div>

            {/* 3. Bong bóng chat chính (Trigger) */}
            <div className="relative">
                <button
                    onClick={() => isOpen ? setIsOpen(false) : handleOpenChat()}
                    className={clsx(
                        "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90",
                        isOpen ? "bg-gray-800 text-white rotate-90" : "bg-sky-600 text-white hover:bg-sky-500"
                    )}
                >
                    {isOpen ? <X size={28} /> : <MessageCircle size={28} className='scale-x-[-1]' />}
                </button>

                {/* Badge thông báo (Hiển thị khi tắt tin nhắn nổi) */}
                {!isOpen && !showNotif && unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-lg animate-bounce">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWidget;