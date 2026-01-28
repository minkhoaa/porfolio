// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // Định nghĩa font family dựa trên biến CSS đã tạo ở layout.tsx
            fontFamily: {
                pixel: ['var(--font-pixel)'],
                mono: ['var(--font-mono)'], // Ghi đè font mono mặc định
            },
            // Bảng màu gợi ý (Theme kiểu Matrix/Terminal cổ điển)
            colors: {
                terminal: {
                    dark: "#0a0a0a",      // Nền cực tối
                    darker: "#050505",    // Dùng cho các khối background phụ
                    green: "#00ff41",     // Màu text chính (kiểu CRT cũ)
                    accent: "#bd00ff",    // Màu nhấn (ví dụ màu tím như trong ảnh bạn gửi)
                    dim: "#4a5568",       // Màu cho text phụ
                },
            },
            // Thêm background image nếu muốn làm hiệu ứng scanlines hoặc grid
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)",
            },
            backgroundSize: {
                'grid-sm': '20px 20px',
            }
        },
    },
    plugins: [],
};
export default config;