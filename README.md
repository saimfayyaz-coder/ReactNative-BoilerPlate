# 🚀 React Native Boilerplate

A production-grade, highly scalable React Native architecture designed for enterprise teams. Built with **Domain-Driven Screen Design**, **RTK Query** with concurrency mutex refresh, **Hardware Keychain** encryption, **MMKV** persistence, and native **Multi-Flavoring**.

---

## 🏛️ The 5-Layer Architecture

The application source (`src/`) strictly partitions code into 5 layers:

```
src/
├── providers/     # Root context wrappers (Redux, Theme, Gestures, Safe Area) & App.tsx
├── navigation/    # Declarative stacks (root/, auth/, main/), types.ts, navigationService.ts
├── screens/       # Domain-driven screens (auth/, profile/, home/, settings/, common/)
├── store/         # State machine (api/ with mutex refresh, storage/, slices/, middlewares/)
└── shared/        # Universal primitives (atoms/, molecules/, widgets/, layouts/, theme/, utils/)
```

### Core Architectural Principles
1. **The Thin Screen Principle:** Screens are lightweight composition shells. All local state, Zod validation, and RTK Query mutations are extracted into dedicated page hooks (`<screen>/hooks/useLogin.ts`).
2. **Domain Screen Grouping & Anti-Crowding:**
   - **Page-Only Components:** Live in `screens/<domain>/<page>/components/`.
   - **Domain-Shared Components:** Live in `screens/<domain>/components/` (e.g. `ProfileAvatar.tsx` shared by `main` and `edit`).
   - **Global Primitives:** Pure design tokens and primitives live in `shared/`.
3. **Mandatory Layout Wrappers:** Raw `<View>` is prohibited as a screen root. Every screen is wrapped in:
   - `ScreenWrapper`: Enforces hardware insets (notches, dynamic islands) and status bar theming.
   - `KeyboardScreenWrapper`: Smooth software keyboard avoidance via `react-native-keyboard-controller`.
4. **Decoupled Multi-Screen Widgets:** Flows appearing across multiple screens (e.g. `OtpVerificationWidget`) are self-contained widgets communicating strictly via callbacks (`onSuccess`, `onCancel`).
5. **Strict Constants Enforcement:** No raw magic strings. All routes (`AUTH_ROUTES`), storage keys (`STORAGE_KEYS`), and icons (`APP_ICONS`) use typed constants.

---

## ⚡ Tech Stack

| Domain | Selected Technology | Purpose |
| :--- | :--- | :--- |
| **State & Caching** | `@reduxjs/toolkit` (RTK Query) + `redux-persist` | Declarative server caching, request deduplication, offline persistence |
| **Storage** | `react-native-mmkv` + `react-native-keychain` | C++ mmap storage (~30x faster) + Hardware Secure Enclave for JWTs |
| **Navigation** | `@react-navigation/native-stack` + `bottom-tabs` | Native platform view transitions (60/120 FPS) |
| **Responsive Layout** | `react-native-size-matters` (`ms`, `scale`, `vs`) | Viewport scaling algorithm (`factor = 0.3`) for small phones & tablets |
| **Vector Glyphs** | `react-native-vector-icons` (Ionicons) | Native font vector rendering with zero pixelation |
| **Keyboard & Polish** | `react-native-keyboard-controller` + `bootsplash` | Frame-by-frame interactive keyboard tracking & splash synchronization |
| **Validation & Env** | `zod` + `react-native-config` | Runtime contract validation & native build variant binding |

---

## 🏁 Getting Started

### 1. Prerequisites
- Node.js `>= 22.11.0`
- React Native CLI & Android SDK / Xcode

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the environment template:
```bash
cp .env.example .env.development
```

---

## 📱 Multi-Flavor Running & Building

The project supports isolated native product flavors (`dev`, `stage`, `prod`) with independent Application IDs and configurations:

```bash
# Run Debug Variants
npm run android:dev      # Target: Local / Sandbox (com.boilerplateapp.dev)
npm run android:stage    # Target: QA / Staging (com.boilerplateapp.stage)
npm run android:prod     # Target: Production (com.boilerplateapp)

# Generate Release APKs
npm run build:android:dev
npm run build:android:stage
npm run build:android:prod

# Generate Production Google Play Bundle (AAB)
npm run bundle:android:prod

# iOS
npm run ios
```

---

## 🔐 Security & Git Rules
- **Environment:** `.env*` files are strictly ignored; commit `.env.example` only.
- **Keystores:** Custom release keystores are ignored; `debug.keystore` is whitelisted for local dev.
- **Google Services:** `google-services.json` is ignored; tracked via `.example` mockup schemas.

---

## 📖 In-Depth Engineering Documentation

For the comprehensive 20-page architecture playbook, component decision trees, and trainee onboarding guides, refer to:
- **Playbook Word Edition:** [`docs/newdoc/Architecture_Playbook.docx`](file:///d:/InstagramClone/docs/newdoc/Architecture_Playbook.docx)
- **Theme Guidelines:** [`docs/newdoc/theme.md`](file:///d:/InstagramClone/docs/newdoc/theme.md)
