import type { Translations } from './en'

const vi: Translations = {
  nav: {
    pages: 'Trang',
    dashboard: 'Bảng điều khiển',
    samplePage: 'Trang mẫu',
    contactForm: 'Biểu mẫu liên hệ',
    comingSoon: 'Sắp ra mắt',
    pwaStatus: 'Trạng thái PWA',
    error: 'Lỗi',
  },
  theme: {
    toggle: 'Chuyển giao diện',
    light: 'Sáng',
    dark: 'Tối',
    system: 'Hệ thống',
  },
  language: {
    label: 'Ngôn ngữ',
    en: 'English',
    vi: 'Tiếng Việt',
  },
  footer: {
    builtBy: 'Được xây dựng bởi',
    sourceCodeOn: 'Mã nguồn có tại',
  },
  dashboard: {
    title: 'Bảng điều khiển',
    refresh: 'Làm mới',
    clear: 'Xóa',
    error: 'Lỗi',
    hero: {
      heading: 'PWA Shadcn Vite Starter',
      subheading: 'Template sẵn sàng cho production, kết hợp React 19, Vite 6, TypeScript, Tailwind CSS v4 và shadcn/ui — tích hợp sẵn PWA, chế độ tối, và đa ngôn ngữ EN/VI.',
      viewOnGithub: 'Xem trên GitHub',
      viewDesignSystem: 'Hệ thống thiết kế',
    },
    techStack: {
      label: 'Công nghệ sử dụng',
    },
    featuresLabel: 'Tính năng',
    features: {
      pwa: {
        title: 'Hỗ trợ PWA',
        desc: 'Service worker qua Vite PWA. Hỗ trợ offline, cài đặt trên máy tính và điện thoại, thông báo cập nhật.',
      },
      theme: {
        title: 'Chế độ tối',
        desc: 'Giao diện sáng, tối và theo hệ thống qua biến CSS. Lưu vào localStorage và chuyển đổi từ thanh tiêu đề.',
      },
      i18n: {
        title: 'Đa ngôn ngữ',
        desc: 'Ngôn ngữ EN và VI với react-i18next. Tự động nhận diện ngôn ngữ từ trình duyệt và lưu vào localStorage.',
      },
      design: {
        title: 'Hệ thống thiết kế',
        desc: 'Token lấy cảm hứng từ Cohere: Space Grotesk, Inter, bo góc 22px, Interaction Blue — được tài liệu hóa tại /design-system.',
      },
      state: {
        title: 'Quản lý trạng thái',
        desc: 'Zustand store với hành động bất đồng bộ. Minh họa các mẫu fetch, loading, lỗi và reset.',
      },
      forms: {
        title: 'Xử lý biểu mẫu',
        desc: 'React Hook Form với xác thực schema Zod. An toàn kiểu, có thể truy cập và tích hợp với shadcn/ui.',
      },
      router: {
        title: 'Điều hướng',
        desc: 'React Router v7 với layout lồng nhau. Các trang nhóm trong menu dropdown với highlight liên kết hiện tại.',
      },
      types: {
        title: 'TypeScript nghiêm ngặt',
        desc: 'Chế độ strict được bật. Path aliases, typed store, typed i18n và không có any ngầm định.',
      },
    },
    demo: {
      label: 'Demo trực tiếp',
      title: 'Bài viết — Zustand Async Store',
      andMore: '+{{count}} bài viết nữa',
    },
    cta: {
      title: 'Bắt đầu xây dựng với template này',
      desc: 'Clone, tùy chỉnh và ra mắt ý tưởng tiếp theo của bạn nhanh chóng.',
      action: 'Dùng template này',
    },
  },
  designSystem: {
    title: 'Hệ thống thiết kế',
    subtitle: 'Lấy cảm hứng từ Cohere · Space Grotesk · Inter · Bo góc thẻ 22px',
    onThisPage: 'Trên trang này',
    sections: {
      colors: 'Màu sắc',
      typography: 'Kiểu chữ',
      buttons: 'Nút bấm',
      cards: 'Thẻ',
      forms: 'Biểu mẫu',
      feedback: 'Phản hồi',
    },
    palette: 'Bảng màu',
    typeScale: 'Thang chữ',
    variantsSizes: 'Biến thể & Kích thước',
    radiusSystem: 'Hệ thống bo góc 22px',
    inputsControls: 'Đầu vào & Điều khiển',
    feedbackOverlays: 'Huy hiệu, Ảnh đại diện, Khung giữ chỗ, Gợi ý',
  },
  pwa: {
    title: 'Trạng thái PWA',
    description: 'Trạng thái service worker, bộ nhớ đệm và cài đặt của ứng dụng.',
    network: 'Mạng',
    online: 'Trực tuyến',
    offline: 'Ngoại tuyến',
    onlineDesc: 'Đã kết nối — dữ liệu thời gian thực sẽ được tải.',
    offlineDesc: 'Không có kết nối — dữ liệu từ bộ nhớ đệm được phục vụ.',
    serviceWorker: 'Service Worker',
    unsupported: 'Không hỗ trợ',
    active: 'Đang hoạt động',
    registering: 'Đang đăng ký',
    installation: 'Cài đặt',
    installed: 'Đã cài đặt',
    available: 'Có thể cài đặt',
    notAvailable: 'Không khả dụng',
    installedDesc: 'Đang chạy dưới dạng ứng dụng độc lập.',
    canInstallDesc: 'Có thể cài đặt lên thiết bị của bạn.',
    notAvailableDesc: 'Không thể cài đặt trong trình duyệt/ngữ cảnh này.',
    cacheStorage: 'Bộ nhớ đệm',
    noCaches: 'Không tìm thấy bộ nhớ đệm. Hãy build và chạy ở chế độ production để tạo bộ nhớ đệm.',
    cacheApiUnsupported: 'Cache API không được hỗ trợ trong trình duyệt này.',
    refresh: 'Làm mới',
    actions: 'Hành động',
    actionsDesc: 'Các hành động khả dụng dựa trên trạng thái PWA hiện tại.',
    applyUpdate: 'Áp dụng cập nhật & tải lại',
    dismissUpdate: 'Bỏ qua cập nhật',
    installApp: 'Cài đặt ứng dụng',
    updatePending: 'Đang chờ cập nhật',
    supported: 'Được hỗ trợ',
    noSW: 'Không có SW',
    offlineReady: 'Sẵn sàng ngoại tuyến',
    notCached: 'Chưa lưu đệm',
    item_one: '{{count}} mục',
    item_other: '{{count}} mục',
    resource_one: '{{count}} tài nguyên được lưu trong {{caches}} bộ nhớ đệm',
    resource_other: '{{count}} tài nguyên được lưu trong {{caches}} bộ nhớ đệm',
  },
  sample: {
    title: 'Trang mẫu',
  },
  contact: {
    title: 'Biểu mẫu liên hệ',
  },
  comingSoon: {
    title: 'Sắp ra mắt',
  },
  notFound: {
    title: '404 — Không tìm thấy trang',
  },
}

export default vi
