// 🔴 نظام النشاط المباشر والمعاملات الحية
// Live Activity & Real-time Transactions System

document.addEventListener('DOMContentLoaded', function() {
    
    // 📊 Live Wallet Transfer Transactions - Global Multi-Language Names
    const walletTransactions = [
        // 🇦🇪 Arabic Names - UAE
        { amount: 499, country: 'UAE', buyerName: 'Ahmed M.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Basic', userInitial: 'A' },
        { amount: 2500, country: 'UAE', buyerName: 'Mohammed K.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Pro', userInitial: 'M' },
        { amount: 10000, country: 'UAE', buyerName: 'Omar H.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Enterprise', userInitial: 'O' },
        
        // 🇸🇦 Arabic Names - Saudi Arabia
        { amount: 499, country: 'Saudi Arabia', buyerName: 'Abdullah S.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'processing', package: 'Basic', userInitial: 'A' },
        { amount: 2500, country: 'Saudi Arabia', buyerName: 'Fahad N.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Pro', userInitial: 'F' },
        { amount: 10000, country: 'Saudi Arabia', buyerName: 'Khalid A.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Enterprise', userInitial: 'K' },
        
        // 🇪🇬 Arabic Names - Egypt
        { amount: 499, country: 'Egypt', buyerName: 'Fatima S.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Basic', userInitial: 'F' },
        { amount: 2500, country: 'Egypt', buyerName: 'Mustafa E.', walletType: 'Bybit', walletIcon: 'bybit', status: 'processing', package: 'Pro', userInitial: 'M' },
        { amount: 499, country: 'Egypt', buyerName: 'Zeinab H.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Basic', userInitial: 'Z' },
        
        // 🇯🇴 Arabic Names - Jordan
        { amount: 2500, country: 'Jordan', buyerName: 'Layla T.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Pro', userInitial: 'L' },
        { amount: 499, country: 'Jordan', buyerName: 'Youssef A.', walletType: 'Binance', walletIcon: 'binance', status: 'processing', package: 'Basic', userInitial: 'Y' },
        
        // 🇲🇦 Arabic Names - Morocco
        { amount: 2500, country: 'Morocco', buyerName: 'Rachid M.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Pro', userInitial: 'R' },
        { amount: 499, country: 'Morocco', buyerName: 'Aicha B.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Basic', userInitial: 'A' },
        
        // 🇮🇳 Indian Names - India
        { amount: 2500, country: 'India', buyerName: 'Rajesh K.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Pro', userInitial: 'R' },
        { amount: 499, country: 'India', buyerName: 'Priya S.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'processing', package: 'Basic', userInitial: 'P' },
        { amount: 10000, country: 'India', buyerName: 'Arjun M.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Enterprise', userInitial: 'A' },
        { amount: 2500, country: 'India', buyerName: 'Deepika R.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Pro', userInitial: 'D' },
        { amount: 499, country: 'India', buyerName: 'Vikram P.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Basic', userInitial: 'V' },
        
        // 🇮🇱 Israeli Names - Israel  
        { amount: 2500, country: 'Israel', buyerName: 'David L.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Pro', userInitial: 'D' },
        { amount: 10000, country: 'Israel', buyerName: 'Sarah C.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Enterprise', userInitial: 'S' },
        { amount: 499, country: 'Israel', buyerName: 'Yoel R.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'processing', package: 'Basic', userInitial: 'Y' },
        { amount: 2500, country: 'Israel', buyerName: 'Michal K.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Pro', userInitial: 'M' },
        
        // 🇫🇷 French Names - France
        { amount: 2500, country: 'France', buyerName: 'Pierre L.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Pro', userInitial: 'P' },
        { amount: 10000, country: 'France', buyerName: 'Marie D.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Enterprise', userInitial: 'M' },
        { amount: 499, country: 'France', buyerName: 'Antoine B.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'processing', package: 'Basic', userInitial: 'A' },
        { amount: 2500, country: 'France', buyerName: 'Sophie M.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Pro', userInitial: 'S' },
        
        // 🇺🇸 American Names - USA
        { amount: 10000, country: 'USA', buyerName: 'John D.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Enterprise', userInitial: 'J' },
        { amount: 499, country: 'USA', buyerName: 'Emily C.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Basic', userInitial: 'E' },
        { amount: 2500, country: 'USA', buyerName: 'Michael R.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'processing', package: 'Pro', userInitial: 'M' },
        { amount: 10000, country: 'USA', buyerName: 'Jessica W.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Enterprise', userInitial: 'J' },
        
        // 🇩🇪 German Names - Germany
        { amount: 10000, country: 'Germany', buyerName: 'Hans M.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Enterprise', userInitial: 'H' },
        { amount: 2500, country: 'Germany', buyerName: 'Ingrid S.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Pro', userInitial: 'I' },
        { amount: 499, country: 'Germany', buyerName: 'Klaus B.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'processing', package: 'Basic', userInitial: 'K' },
        { amount: 2500, country: 'Germany', buyerName: 'Greta W.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Pro', userInitial: 'G' },
        
        // 🇪🇸 Spanish Names - Spain
        { amount: 2500, country: 'Spain', buyerName: 'Carlos R.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Pro', userInitial: 'C' },
        { amount: 499, country: 'Spain', buyerName: 'Maria G.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'processing', package: 'Basic', userInitial: 'M' },
        { amount: 10000, country: 'Spain', buyerName: 'Diego L.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Enterprise', userInitial: 'D' },
        
        // 🇷🇺 Russian Names - Russia
        { amount: 2500, country: 'Russia', buyerName: 'Vladimir P.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Pro', userInitial: 'V' },
        { amount: 499, country: 'Russia', buyerName: 'Natasha K.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Basic', userInitial: 'N' },
        { amount: 10000, country: 'Russia', buyerName: 'Dimitri S.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'processing', package: 'Enterprise', userInitial: 'D' },
        
        // 🇨🇳 Chinese Names - China
        { amount: 2500, country: 'China', buyerName: 'Wei L.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Pro', userInitial: 'W' },
        { amount: 10000, country: 'China', buyerName: 'Ming Z.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Enterprise', userInitial: 'M' },
        { amount: 499, country: 'China', buyerName: 'Li X.', walletType: 'Bybit', walletIcon: 'bybit', status: 'processing', package: 'Basic', userInitial: 'L' },
        
        // 🇯🇵 Japanese Names - Japan
        { amount: 2500, country: 'Japan', buyerName: 'Takeshi Y.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Pro', userInitial: 'T' },
        { amount: 499, country: 'Japan', buyerName: 'Yuki S.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Basic', userInitial: 'Y' },
        { amount: 10000, country: 'Japan', buyerName: 'Hiroshi M.', walletType: 'Binance', walletIcon: 'binance', status: 'processing', package: 'Enterprise', userInitial: 'H' },
        
        // 🇰🇷 Korean Names - South Korea
        { amount: 2500, country: 'South Korea', buyerName: 'Jin W.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Pro', userInitial: 'J' },
        { amount: 499, country: 'South Korea', buyerName: 'Soo-jin K.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Basic', userInitial: 'S' },
        
        // 🇨🇦 Canadian Names - Canada
        { amount: 499, country: 'Canada', buyerName: 'Robert T.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'processing', package: 'Basic', userInitial: 'R' },
        { amount: 10000, country: 'Canada', buyerName: 'Jennifer H.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Enterprise', userInitial: 'J' },
        
        // 🇬🇧 British Names - UK
        { amount: 2500, country: 'UK', buyerName: 'James B.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Pro', userInitial: 'J' },
        { amount: 499, country: 'UK', buyerName: 'Charlotte W.', walletType: 'Bybit', walletIcon: 'bybit', status: 'processing', package: 'Basic', userInitial: 'C' },
        
        // 🇦🇺 Australian Names - Australia
        { amount: 2500, country: 'Australia', buyerName: 'Jackson P.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Pro', userInitial: 'J' },
        { amount: 10000, country: 'Australia', buyerName: 'Olivia M.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Enterprise', userInitial: 'O' },
        
        // 🇮🇹 Italian Names - Italy
        { amount: 499, country: 'Italy', buyerName: 'Marco R.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Basic', userInitial: 'M' },
        { amount: 2500, country: 'Italy', buyerName: 'Giulia F.', walletType: 'Bybit', walletIcon: 'bybit', status: 'processing', package: 'Pro', userInitial: 'G' },
        
        // 🇧🇷 Brazilian Names - Brazil
        { amount: 2500, country: 'Brazil', buyerName: 'Carlos S.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Pro', userInitial: 'C' },
        { amount: 499, country: 'Brazil', buyerName: 'Ana L.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Basic', userInitial: 'A' },
        
        // 🇳🇱 Dutch Names - Netherlands
        { amount: 2500, country: 'Netherlands', buyerName: 'Pieter V.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Pro', userInitial: 'P' },
        { amount: 499, country: 'Netherlands', buyerName: 'Emma J.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'processing', package: 'Basic', userInitial: 'E' },
        
        // 🇸🇪 Swedish Names - Sweden
        { amount: 10000, country: 'Sweden', buyerName: 'Lars A.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Enterprise', userInitial: 'L' },
        { amount: 2500, country: 'Sweden', buyerName: 'Astrid S.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Pro', userInitial: 'A' },
        
        // 🇳🇴 Norwegian Names - Norway
        { amount: 2500, country: 'Norway', buyerName: 'Magnus H.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'processing', package: 'Pro', userInitial: 'M' },
        { amount: 499, country: 'Norway', buyerName: 'Ingrid N.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Basic', userInitial: 'I' },
        
        // 🇩🇰 Danish Names - Denmark
        { amount: 2500, country: 'Denmark', buyerName: 'Christian L.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Pro', userInitial: 'C' },
        { amount: 10000, country: 'Denmark', buyerName: 'Sofie M.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'processing', package: 'Enterprise', userInitial: 'S' },
        
        // 🇨🇭 Swiss Names - Switzerland
        { amount: 10000, country: 'Switzerland', buyerName: 'Andreas B.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Enterprise', userInitial: 'A' },
        { amount: 2500, country: 'Switzerland', buyerName: 'Nicole R.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Pro', userInitial: 'N' },
        
        // 🇦🇹 Austrian Names - Austria
        { amount: 2500, country: 'Austria', buyerName: 'Wolfgang S.', walletType: 'Bybit', walletIcon: 'bybit', status: 'processing', package: 'Pro', userInitial: 'W' },
        { amount: 499, country: 'Austria', buyerName: 'Marlene K.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Basic', userInitial: 'M' },
        
        // 🇧🇪 Belgian Names - Belgium
        { amount: 2500, country: 'Belgium', buyerName: 'Luc D.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Pro', userInitial: 'L' },
        { amount: 499, country: 'Belgium', buyerName: 'Sarah V.', walletType: 'Binance', walletIcon: 'binance', status: 'processing', package: 'Basic', userInitial: 'S' },
        
        // 🇵🇹 Portuguese Names - Portugal
        { amount: 2500, country: 'Portugal', buyerName: 'João M.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Pro', userInitial: 'J' },
        { amount: 499, country: 'Portugal', buyerName: 'Maria S.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Basic', userInitial: 'M' },
        
        // 🇬🇷 Greek Names - Greece
        { amount: 2500, country: 'Greece', buyerName: 'Dimitris P.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'processing', package: 'Pro', userInitial: 'D' },
        { amount: 499, country: 'Greece', buyerName: 'Elena K.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Basic', userInitial: 'E' },
        
        // 🇹🇷 Turkish Names - Turkey
        { amount: 10000, country: 'Turkey', buyerName: 'Mehmet A.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Enterprise', userInitial: 'M' },
        { amount: 2500, country: 'Turkey', buyerName: 'Ayşe Y.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'processing', package: 'Pro', userInitial: 'A' },
        { amount: 499, country: 'Turkey', buyerName: 'Emre K.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Basic', userInitial: 'E' },
        
        // 🇵🇰 Pakistani Names - Pakistan
        { amount: 2500, country: 'Pakistan', buyerName: 'Hassan M.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Pro', userInitial: 'H' },
        { amount: 499, country: 'Pakistan', buyerName: 'Fatima K.', walletType: 'Bybit', walletIcon: 'bybit', status: 'processing', package: 'Basic', userInitial: 'F' },
        { amount: 10000, country: 'Pakistan', buyerName: 'Ali R.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Enterprise', userInitial: 'A' },
        
        // 🇧🇩 Bangladeshi Names - Bangladesh
        { amount: 499, country: 'Bangladesh', buyerName: 'Rahman S.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Basic', userInitial: 'R' },
        { amount: 2500, country: 'Bangladesh', buyerName: 'Nasreen A.', walletType: 'Binance', walletIcon: 'binance', status: 'processing', package: 'Pro', userInitial: 'N' },
        
        // 🇮🇩 Indonesian Names - Indonesia
        { amount: 2500, country: 'Indonesia', buyerName: 'Budi S.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Pro', userInitial: 'B' },
        { amount: 499, country: 'Indonesia', buyerName: 'Sari W.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Basic', userInitial: 'S' },
        { amount: 10000, country: 'Indonesia', buyerName: 'Ahmad H.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'processing', package: 'Enterprise', userInitial: 'A' },
        
        // 🇲🇾 Malaysian Names - Malaysia
        { amount: 2500, country: 'Malaysia', buyerName: 'Ahmad L.', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Pro', userInitial: 'A' },
        { amount: 499, country: 'Malaysia', buyerName: 'Siti R.', walletType: 'Bybit', walletIcon: 'bybit', status: 'processing', package: 'Basic', userInitial: 'S' },
        
        // 🇹🇭 Thai Names - Thailand
        { amount: 2500, country: 'Thailand', buyerName: 'Somchai P.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Pro', userInitial: 'S' },
        { amount: 499, country: 'Thailand', buyerName: 'Niran T.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Basic', userInitial: 'N' },
        
        // 🇻🇳 Vietnamese Names - Vietnam
        { amount: 2500, country: 'Vietnam', buyerName: 'Nguyen H.', walletType: 'Binance', walletIcon: 'binance', status: 'processing', package: 'Pro', userInitial: 'N' },
        { amount: 499, country: 'Vietnam', buyerName: 'Linh T.', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Basic', userInitial: 'L' },
        
        // 🇵🇭 Filipino Names - Philippines
        { amount: 2500, country: 'Philippines', buyerName: 'Jose R.', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Pro', userInitial: 'J' },
        { amount: 499, country: 'Philippines', buyerName: 'Maria C.', walletType: 'MetaMask', walletIcon: 'metamask', status: 'processing', package: 'Basic', userInitial: 'M' },
        
        // 🇸🇦 Arabic Names - Male Names (أسماء عربية - رجال)
        { amount: 10000, country: 'Saudi Arabia', buyerName: 'أحمد العلي', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Enterprise', userInitial: 'أ' },
        { amount: 2500, country: 'UAE', buyerName: 'محمد الشامي', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Pro', userInitial: 'م' },
        { amount: 499, country: 'Qatar', buyerName: 'علي الحمد', walletType: 'MetaMask', walletIcon: 'metamask', status: 'processing', package: 'Basic', userInitial: 'ع' },
        { amount: 10000, country: 'Kuwait', buyerName: 'خالد النصار', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Enterprise', userInitial: 'خ' },
        { amount: 2500, country: 'Egypt', buyerName: 'عبدالله محمد', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Pro', userInitial: 'ع' },
        { amount: 499, country: 'Jordan', buyerName: 'يوسف الأحمد', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'processing', package: 'Basic', userInitial: 'ي' },
        { amount: 10000, country: 'Lebanon', buyerName: 'إبراهيم الخوري', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Enterprise', userInitial: 'إ' },
        { amount: 2500, country: 'Morocco', buyerName: 'عبدالرحمن بن علي', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Pro', userInitial: 'ع' },
        { amount: 499, country: 'UAE', buyerName: 'فيصل الزهراني', walletType: 'Binance', walletIcon: 'binance', status: 'processing', package: 'Basic', userInitial: 'ف' },
        { amount: 2500, country: 'Saudi Arabia', buyerName: 'ناصر القحطاني', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Pro', userInitial: 'ن' },
        { amount: 10000, country: 'Qatar', buyerName: 'سلطان العتيبي', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Enterprise', userInitial: 'س' },
        { amount: 499, country: 'Kuwait', buyerName: 'بندر الصباح', walletType: 'Bybit', walletIcon: 'bybit', status: 'processing', package: 'Basic', userInitial: 'ب' },
        { amount: 2500, country: 'Egypt', buyerName: 'حسام الدين', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Pro', userInitial: 'ح' },
        { amount: 499, country: 'Jordan', buyerName: 'ماجد الأردني', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Basic', userInitial: 'م' },
        { amount: 10000, country: 'Lebanon', buyerName: 'طارق الحريري', walletType: 'MetaMask', walletIcon: 'metamask', status: 'processing', package: 'Enterprise', userInitial: 'ط' },
        { amount: 2500, country: 'Morocco', buyerName: 'رشيد المغربي', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Pro', userInitial: 'ر' },
        { amount: 499, country: 'UAE', buyerName: 'سالم الكعبي', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Basic', userInitial: 'س' },
        { amount: 2500, country: 'Saudi Arabia', buyerName: 'عادل الغامدي', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'processing', package: 'Pro', userInitial: 'ع' },
        { amount: 10000, country: 'Qatar', buyerName: 'جاسم الثاني', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Enterprise', userInitial: 'ج' },
        { amount: 499, country: 'Kuwait', buyerName: 'وليد الكويتي', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Basic', userInitial: 'و' },
        
        // 🇸🇦 Arabic Names - Female Names (أسماء عربية - نساء)
        { amount: 2500, country: 'Saudi Arabia', buyerName: 'فاطمة الزهراء', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Pro', userInitial: 'ف' },
        { amount: 499, country: 'UAE', buyerName: 'عائشة المرزوقي', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'processing', package: 'Basic', userInitial: 'ع' },
        { amount: 10000, country: 'Qatar', buyerName: 'خديجة القطرية', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Enterprise', userInitial: 'خ' },
        { amount: 2500, country: 'Kuwait', buyerName: 'زينب الصباح', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Pro', userInitial: 'ز' },
        { amount: 499, country: 'Egypt', buyerName: 'مريم الأسيوطي', walletType: 'Binance', walletIcon: 'binance', status: 'processing', package: 'Basic', userInitial: 'م' },
        { amount: 2500, country: 'Jordan', buyerName: 'نور الدين', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Pro', userInitial: 'ن' },
        { amount: 10000, country: 'Lebanon', buyerName: 'سارة اللبنانية', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Enterprise', userInitial: 'س' },
        { amount: 499, country: 'Morocco', buyerName: 'ليلى المغربية', walletType: 'Bybit', walletIcon: 'bybit', status: 'processing', package: 'Basic', userInitial: 'ل' },
        { amount: 2500, country: 'UAE', buyerName: 'أميرة الإماراتية', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Pro', userInitial: 'أ' },
        { amount: 499, country: 'Saudi Arabia', buyerName: 'هند السعودية', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Basic', userInitial: 'ه' },
        { amount: 10000, country: 'Qatar', buyerName: 'رقية القطرية', walletType: 'MetaMask', walletIcon: 'metamask', status: 'processing', package: 'Enterprise', userInitial: 'ر' },
        { amount: 2500, country: 'Kuwait', buyerName: 'حفصة الكويتية', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Pro', userInitial: 'ح' },
        { amount: 499, country: 'Egypt', buyerName: 'آمنة المصرية', walletType: 'Binance', walletIcon: 'binance', status: 'completed', package: 'Basic', userInitial: 'آ' },
        { amount: 2500, country: 'Jordan', buyerName: 'دعاء الأردنية', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'processing', package: 'Pro', userInitial: 'د' },
        { amount: 10000, country: 'Lebanon', buyerName: 'ياسمين اللبنانية', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Enterprise', userInitial: 'ي' },
        { amount: 499, country: 'Morocco', buyerName: 'سلمى المغربية', walletType: 'Bybit', walletIcon: 'bybit', status: 'completed', package: 'Basic', userInitial: 'س' },
        { amount: 2500, country: 'UAE', buyerName: 'شيماء الإماراتية', walletType: 'Binance', walletIcon: 'binance', status: 'processing', package: 'Pro', userInitial: 'ش' },
        { amount: 499, country: 'Saudi Arabia', buyerName: 'أسماء السعودية', walletType: 'Trust Wallet', walletIcon: 'trust', status: 'completed', package: 'Basic', userInitial: 'أ' },
        { amount: 10000, country: 'Qatar', buyerName: 'منى القطرية', walletType: 'MetaMask', walletIcon: 'metamask', status: 'completed', package: 'Enterprise', userInitial: 'م' },
        { amount: 2500, country: 'Kuwait', buyerName: 'إيمان الكويتية', walletType: 'Bybit', walletIcon: 'bybit', status: 'processing', package: 'Pro', userInitial: 'إ' }
    ];

    // 🎯 إنشاء نشاط حي وهمي
    function createLiveActivity() {
        const activityContainer = document.createElement('div');
        activityContainer.className = 'live-activity-feed';
        activityContainer.id = 'live-activity-feed';
        activityContainer.innerHTML = `

                <div class="header-left">
                    <i class="fas fa-wallet activity-wallet-icon"></i>
                    <h3>🔴 Live Wallet Transfers</h3>
                </div>
                <div class="live-indicator">
                    <span class="pulse-dot"></span>
                    <span>LIVE</span>
                </div>
            </div>
            <div class="activity-list" id="activity-list">
                <!-- المعاملات ستظهر هنا -->
            </div>
        `;

        // إضافة الأنماط
        const activityStyles = `
            <style>
            .live-activity-feed {
                position: fixed;
                top: 150px;
                right: 20px;
                width: 300px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                border: 1px solid rgba(0,0,0,0.1);
                z-index: 1000;
                max-height: 400px;
                overflow: hidden;
            }


                background: linear-gradient(135deg, #F3BA4C 0%, #F0B90B 100%);
                color: #1E1E1E;
                padding: 12px 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .header-left {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .activity-wallet-icon {
                font-size: 18px;
                color: #1E1E1E;
            }

            @media (max-width: 768px) {
                .activity-wallet-icon {
                    font-size: 24px;
                    padding: 8px;
                    margin-right: 5px;
                    transition: all 0.3s ease;
                }
                .activity-wallet-icon:active {
                    transform: scale(0.95);
                }
            }


                margin: 0;
                font-size: 14px;
                font-weight: 600;
                color: #1E1E1E;
            }

            .live-indicator {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 12px;
                font-weight: 500;
            }

            .pulse-dot {
                width: 8px;
                height: 8px;
                background: #ef4444;
                border-radius: 50%;
                animation: pulse-red 2s infinite;
            }

            @keyframes pulse-red {
                0% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.5; transform: scale(1.2); }
                100% { opacity: 1; transform: scale(1); }
            }

            .activity-list {
                max-height: 320px;
                overflow-y: auto;
                padding: 8px 0;
            }

            .activity-item {
                padding: 14px 16px;
                border-bottom: 1px solid #f3f4f6;
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 13px;
                opacity: 0;
                transform: translateX(20px);
                animation: slideIn 0.5s ease forwards;
                transition: all 0.3s ease;
            }

            .activity-item:hover {
                background: #f9fafb;
            }

            .wallet-transaction {
                border-left: 3px solid #10b981;
                transition: all 0.3s ease;
            }

            @keyframes slideIn {
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            .activity-item:last-child {
                border-bottom: none;
            }

            .user-avatar {
                width: 36px;
                height: 36px;
                background: linear-gradient(135deg, #F0B90B 0%, #F3BA4C 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #1E1E1E;
                font-size: 14px;
                font-weight: 600;
                flex-shrink: 0;
                border: 2px solid #fff;
                box-shadow: 0 2px 8px rgba(240, 185, 11, 0.3);
            }

            .activity-content {
                flex: 1;
                line-height: 1.3;
            }

            .transaction-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 4px;
            }

            .buyer-name {
                font-weight: 600;
                color: #1f2937;
                font-size: 13px;
            }

            .transaction-amount {
                font-weight: 700;
                color: #059669;
                font-size: 13px;
            }

            .transaction-details {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }

            .wallet-transfer-info {
                display: flex;
                align-items: center;
                gap: 6px;
                margin-bottom: 4px;
                padding: 3px 6px;
                background: rgba(16, 185, 129, 0.1);
                border-radius: 6px;
                border: 1px solid rgba(16, 185, 129, 0.2);
            }

            .transfer-arrow {
                color: #10b981;
                font-size: 10px;
            }

            .wallet-name {
                font-size: 11px;
                font-weight: 600;
                color: #1f2937;
            }

            .wallet-logo {
                width: 18px;
                height: 18px;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            /* 🟡 Binance Logo */
            .wallet-logo.binance {
                background: linear-gradient(135deg, #F0B90B 0%, #F3BA4C 100%);
                position: relative;
            }

            .wallet-logo.binance::before {
                content: "";
                position: absolute;
                width: 10px;
                height: 10px;
                background: white;
                transform: rotate(45deg);
                clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            }

            /* 🔵 Trust Wallet Logo */
            .wallet-logo.trust {
                background: linear-gradient(135deg, #3375BB 0%, #4A90E2 100%);
                position: relative;
            }

            .wallet-logo.trust::before {
                content: "🛡️";
                font-size: 10px;
                color: white;
                position: absolute;
            }

            /* 🟠 MetaMask Logo */
            .wallet-logo.metamask {
                background: linear-gradient(135deg, #F6851B 0%, #E2761B 100%);
                position: relative;
            }

            .wallet-logo.metamask::before {
                content: "🦊";
                font-size: 10px;
                position: absolute;
            }

            /* 🟡 Bybit Logo */
            .wallet-logo.bybit {
                background: linear-gradient(135deg, #F7A600 0%, #FDB833 100%);
                position: relative;
            }

            .wallet-logo.bybit::before {
                content: "";
                position: absolute;
                width: 8px;
                height: 8px;
                background: white;
                clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
                transform: rotate(0deg);
            }

            .transaction-info {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 11px;
                color: #6b7280;
            }

            .country-flag {
                font-size: 12px;
            }

            .country-name {
                font-weight: 500;
            }

            .separator {
                color: #d1d5db;
            }

            .fee-info {
                color: #f59e0b;
                font-weight: 500;
            }

            .package-tag {
                font-size: 10px;
                font-weight: 600;
                padding: 2px 6px;
                border-radius: 8px;
                color: white;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .package-basic {
                background: linear-gradient(135deg, #3b82f6, #1e40af);
            }

            .package-pro {
                background: linear-gradient(135deg, #10b981, #047857);
            }

            .package-enterprise {
                background: linear-gradient(135deg, #7c3aed, #5b21b6);
            }

            .transaction-status {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                gap: 4px;
            }

            .status-indicator {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 11px;
                font-weight: 500;
            }

            .status-indicator.text-green-600 {
                color: #059669;
            }

            .status-indicator.text-yellow-600 {
                color: #d97706;
            }

            .time-ago {
                font-size: 10px;
                color: #9ca3af;
                white-space: nowrap;
            }

            /* تأثيرات إضافية للمعاملات */
            .wallet-transaction:hover {
                background: linear-gradient(90deg, rgba(16, 185, 129, 0.03) 0%, transparent 100%);
                transform: translateX(-2px);
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
            }

            .transaction-amount {
                position: relative;
            }

            .transaction-amount::after {
                content: "";
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
                height: 1px;
                background: currentColor;
                opacity: 0.3;
            }

            /* تحسين حالات الإنجاز */
            .status-indicator.text-green-600 {
                background: rgba(16, 185, 129, 0.1);
                padding: 2px 6px;
                border-radius: 6px;
                border: 1px solid rgba(16, 185, 129, 0.3);
            }

            .status-indicator.text-yellow-600 {
                background: rgba(245, 158, 11, 0.1);
                padding: 2px 6px;
                border-radius: 6px;
                border: 1px solid rgba(245, 158, 11, 0.3);
            }

            .status-indicator i {
                margin-right: 4px;
            }

            /* إخفاء على الشاشات الصغيرة */
            @media (max-width: 1024px) {
                .live-activity-feed {
                    display: none;
                }
            }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', activityStyles);
        document.body.appendChild(activityContainer);
    }

    // 🌍 دالة الحصول على علم الدولة
    function getCountryFlag(country) {
        const countryFlags = {
            'UAE': '🇦🇪', 'Saudi Arabia': '🇸🇦', 'Qatar': '🇶🇦', 'Kuwait': '🇰🇼',
            'Egypt': '🇪🇬', 'Jordan': '🇯🇴', 'Lebanon': '🇱🇧', 'Morocco': '🇲🇦',
            'India': '🇮🇳', 'Israel': '🇮🇱', 'France': '🇫🇷', 'USA': '🇺🇸',
            'Germany': '🇩🇪', 'Spain': '🇪🇸', 'Russia': '🇷🇺', 'China': '🇨🇳',
            'Japan': '🇯🇵', 'South Korea': '🇰🇷', 'Canada': '🇨🇦', 'UK': '🇬🇧',
            'Australia': '🇦🇺', 'Italy': '🇮🇹', 'Brazil': '🇧🇷', 'Netherlands': '🇳🇱',
            'Sweden': '🇸🇪', 'Norway': '🇳🇴', 'Denmark': '🇩🇰', 'Switzerland': '🇨🇭',
            'Austria': '🇦🇹', 'Belgium': '🇧🇪', 'Portugal': '🇵🇹', 'Greece': '🇬🇷',
            'Turkey': '🇹🇷', 'Pakistan': '🇵🇰', 'Bangladesh': '🇧🇩', 'Indonesia': '🇮🇩',
            'Malaysia': '🇲🇾', 'Thailand': '🇹🇭', 'Vietnam': '🇻🇳', 'Philippines': '🇵🇭'
        };
        return countryFlags[country] || '🌍';
    }

    // 🔄 إضافة معاملة محفظة جديدة
    function addNewWalletTransaction() {
        const activityList = document.getElementById('activity-list');
        if (!activityList) return;

        const transaction = walletTransactions[Math.floor(Math.random() * walletTransactions.length)];
        const amount = transaction.amount;
        
        const timeAgo = Math.floor(Math.random() * 5) + 1; // 1-5 minutes
        const statusIcon = transaction.status === 'completed' ? 'fa-check-circle' : 'fa-clock';
        const statusColor = transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600';
        const statusText = transaction.status === 'completed' ? 'Transfer Completed' : 'Processing Transfer';
        
        const transactionHTML = `
            <div class="activity-item wallet-transaction">
                <div class="user-avatar">
                    ${transaction.userInitial}
                </div>
                <div class="activity-content">
                    <div class="transaction-header">
                        <div class="buyer-name" ${transaction.buyerName.match(/[\u0600-\u06FF]/) ? 'lang="ar"' : ''}>${transaction.buyerName}</div>
                        <div class="transaction-amount">${amount.toLocaleString()} USDT</div>
                    </div>
                    <div class="transaction-details">
                        <div class="wallet-transfer-info">
                            <i class="fas fa-arrow-right transfer-arrow"></i>
                            <span class="wallet-name">${transaction.walletType}</span>
                            <div class="wallet-logo ${transaction.walletIcon}"></div>
                        </div>
                        <div class="transaction-info">
                            <span class="country-flag">${getCountryFlag(transaction.country)}</span>
                            <span class="country-name">${transaction.country}</span>
                            <span class="separator">•</span>
                            <span class="package-tag package-${transaction.package.toLowerCase()}">${transaction.package}</span>
                        </div>
                    </div>
                </div>
                <div class="transaction-status">
                    <div class="status-indicator ${statusColor}">
                        <i class="fas ${statusIcon}"></i>
                        <span>${statusText}</span>
                    </div>
                    <div class="time-ago">${timeAgo}m ago</div>
                </div>
            </div>
        `;

        activityList.insertAdjacentHTML('afterbegin', transactionHTML);

        // الاحتفاظ بـ 5 معاملات فقط
        const items = activityList.querySelectorAll('.activity-item');
        if (items.length > 5) {
            items[items.length - 1].remove();
        }
    }

    // 🌍 الحصول على علم الدولة
    function getCountryFlag(country) {
        const flags = {
            'UAE': '🇦🇪',
            'Saudi Arabia': '🇸🇦',
            'Qatar': '🇶🇦',
            'Kuwait': '🇰🇼',
            'Egypt': '🇪🇬',
            'Jordan': '🇯🇴',
            'Lebanon': '🇱🇧',
            'USA': '🇺🇸',
            'Canada': '🇨🇦',
            'Germany': '🇩🇪',
            'UK': '🇬🇧',
            'France': '🇫🇷',
            'Morocco': '🇲🇦'
        };
        return flags[country] || '🌍';
    }

    // 📈 تحديث الإحصائيات
    function updateStats() {
        // تحديث المستخدمين النشطين
        const liveActivityElement = document.getElementById('live-activity');
        if (liveActivityElement) {
            const currentUsers = parseInt(liveActivityElement.textContent);
            const newUsers = Math.max(1, currentUsers + Math.floor(Math.random() * 3) - 1);
            liveActivityElement.textContent = newUsers;
        }

        // تحديث العدادات
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = Math.floor(Math.random() * 3) + 1;
            const newValue = target + increment;
            counter.setAttribute('data-target', newValue);
            counter.textContent = newValue.toLocaleString();
        });
    }

    // 🚀 تشغيل نظام معاملات المحافظ المباشر
    function initializeWalletLiveActivity() {
        createLiveActivity();
        
        // إضافة المعاملات الأولية
        setTimeout(() => {
            addNewWalletTransaction();
        }, 2000);

        setTimeout(() => {
            addNewWalletTransaction();
        }, 4000);

        setTimeout(() => {
            addNewWalletTransaction();
        }, 6000);

        // معاملة جديدة كل 12-35 ثانية
        setInterval(() => {
            addNewWalletTransaction();
        }, Math.random() * 23000 + 12000);

        // تحديث الإحصائيات كل 25 ثانية
        setInterval(() => {
            updateStats();
        }, 25000);
    }

    // 🎬 بدء نشاط معاملات المحافظ المباشر بعد تحميل الصفحة
    setTimeout(initializeWalletLiveActivity, 3000);
});