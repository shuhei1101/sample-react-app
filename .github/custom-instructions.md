# カスタムインストラクション
## 目次
- [目次](#目次)
- [はじめに](#はじめに)
- [プロンプトオプション一覧](#プロンプトオプション一覧)
- [イシューの作成方法](#イシューの作成方法)
- [開発規約](#開発規約)
  - [共通](#共通)
  - [ページ](#ページ)
  - [UIコンポーネント](#uiコンポーネント)
  - [状態管理](#状態管理)
  - [モデル](#モデル)
  - [値オブジェクト](#値オブジェクト)
  - [ハンドラー](#ハンドラー)
  - [サービス層](#サービス層)
  - [ルータ](#ルータ)
  - [命名規則](#命名規則)
  - [デモページ](#デモページ)

## はじめに
- `/Users/nishikawashuhei/nishikawa/30_repos/allowance-questboard/docs/ja/index`を読んでから作業すること
- 作業する際は、内容にそったドキュメントを読んでから作業すること(例えば、テストを作成するなら→`docs/ja/development/testing.md`)
- 作業内容がドキュメント(docs/)に影響がある場合は更新すること
- 修正が完了後、こちらでGitコミットをするため、**コミットメッセージを含めたコマンドを出力すること**
- 実行はこちらで行います。
  - 例: 
```bash
cd /Users/nishikawashuhei/nishikawa/30_repos/allowance-questboard
git add .
git commit -m "feat: 概要

- ここに変更内容の概要を記載
- 
- "
git push origin main

```
- 絶対にコミット&プッシュはしないこと。コマンドの出力のみ行うこと
- 最後に改行を入れること

- 実装完了後に`expo start`や`npm run dev`などの動作確認コマンドはしないこと
  - こちらで実行します。

## プロンプトオプション一覧
- `@質問`: ファイルの編集は行わなわず、質問に答えること
- `@イシュー`: イシューを作成すること（「イシューの作成方法」参照）
  - イシュー以外のファイルは編集しないこと
  - `@イシュー作成`: 新規にイシューを作成すること
  - `@イシュー修正`: 既存のイシューを修正すること
- `@イシュー対応`: イシューに基づいて実装、修正を行うこと
  - ユーザが選択したセクションのみ実行すること
  - 一セクションのサイクル
    1. 記載内容に基づいて実装、修正を行うこと
    2. 一セクション完了後は、VSCodeのエラーチェックを行い、エラーがないことを確認すること
    3. 作業完了後、イシューの該当セクションを完了済みにすること（`- [x]`）
  - 実装時の注意点
    - 新規コンポーネント作成時: デモ画面のコンポーネント一覧にも配置すること（ComponentListPage.tsx）
- `@調査`: バグ原因調査を行い、イシューを作成する

## イシューの作成方法
- イシューのファイル作成場所
  - `/Users/nishikawashuhei/nishikawa/30_repos/allowance-questboard/docs/ja/issues/YYYYMMDD_イシュー内容.md`

- タスクはmarkdownのチェックリスト形式で作成すること
例:
```markdown
### 1. バックエンド (値オブジェクト)
- [ ] {モジュール名を記載}
  - ファイルパス: `@frontend/src/features/xxx/.../xxx.ts`(50行目, {関数名やクラス名})
  - 概要: 
    - xxx
    - yyy(10-30行目)
  - 参考: {参考にするファイルパスを記載}
  - {任意の補足情報を記載}（極力このセクションは増やさず、概要に書くこと）
```
- 既に存在するモジュールも記載する。ただし、完了済みにすること（`- [x]`）
- 上記以外のルールは、最新のイシューを参考にすること
- イシューは依存度の低いものから順に記載すること
  - 例: 値オブジェクト→バックエンド→...→フロントエンド→...
- 概要で具体的な箇所が分かる場合は、行数や関数名、クラス名を記載すること

- 画面がある場合は、「画面レイアウト」セクションを追加すること
- 画面レイアウトはテキストで２次元的に表現すること
```plaintext
  |-------------------------------|
  | ヘッダー                      |
  |-------------------------------|
  | メインコンテンツ              |
  | - ボタン1                    |
  | - ボタン2                    |
  |-------------------------------|
```



## 開発規約
### 共通
#### フロー
- `ユーザ`: 要件の定義
- `AI`: 要件に基づいたイシューの作成
  - セクションの単位: レイヤーごと（例: ビジネスロジック層、データアクセス層、API層）
  - モジュール単位: 一ファイル単位
  - 含めること:
    - ファイルパス
    - 概要
- `ユーザ`: イシューのレビューと承認
- `AI`: 実装の実行

#### ファイル
- `index.ts`は作成しないこと
  - 理由: 反映漏れを防ぐため



#### 守るべき原則
- KISS: コードをシンプルにして、複雑なら分割すること
- DRY: 同じコードを繰り返さないこと
- YAGNI: 必要になるまで実装しないこと
- SRP: 一つのクラスや関数は一つの責務だけを持つこと(ビジネスロジックを除く)
- SLAP: メソッドを低レイヤー高レイヤーに分けること
  - 例: ビジネスロジック層とデータアクセス層を分けること

#### コメント
- 引数や戻り値の型は必ずコメントを記載すること
- コメントは一行で簡潔に行うこと
##### 関数とかクラスのドキュメンテーションの書き方
```ts
/** ここにタイトルを書く（複数行コメントの例）
 *
 * ここに説明を書く */
interface Props {
  /** 表示するアイコン一覧 */
  icons: Icons;
  /** 現在選択されているアイコン */
  selectedIcon?: Icon;
  /** アイコンが選択された時のコールバック */
  onIconSelect: (icon: Icon) => void;
  /** アイコン取得関数 */
  getIconByName: GetIconByName;
}

// 良くない例↓
/**
 * サンプルインターフェース(縦に長くなってしまうためNG)
 * 
 * 説明文
 */
interface SampleInterface {
  /** 
   * サンプルプロパティ(NGな書き方)
   */
  sampleProperty: string;

}


```

- 一行のdocsは改行せずに/** */で囲む
- 複数行の場合でも、最初と最後の/** */は改行しない
- コメントは**日本語**で記述すること
- ソースコード内のコメントに絵文字などは使わないこと
- 引数や戻り値は必ずコメントを記載すること
- 一行のコメントを書くときのルール
  - `〜する`や`〜です`などの言葉は省くこと
  - 一文の時は最後に丸`。`をつけないこと
    - 例: 
      - ✗: hogeを処理する。
      - ○: hogeを処理

- 複数行コメントを書くときのルール
  - 極力スマートにシンプルに記述すること



#### 例外
- アプリ内の例外はすべて`AppError`もしくは`AppError`を継承したクラスでthrowすること

#### 関数
##### 関数やメソッドのシグネチャの共有
- tsで関数やメソッドのシグネチャはtypeを用いて共有すること
```ts
// testFunction.ts
export type TestFunction = (params: { id: string, name: string }) => void;  // ファイルの一番上に共有するシグネチャを書くこと

export const testFunction: TestFunction = (params) => {  // 対象の関数はシグネチャを参照しておく
  // ...
};


// anotherFile.ts
import { TestFunction } from './testFunction';

const anotherFunction = (params: {
  testFunction: TestFunction;  // ここでシグネチャを共有することにより、テスタブルになる
}) => {
  // ...
}

```

##### 引数や戻り値の型
- 引数は必ずparamsをつけること
```ts
test(params: { id: string, name: string }): void {
  // ...
}
```
- もしくは、型定義を使用すること
```ts
export interface TestParams {
  id: string;
  name: string;
};
test(params: TestParams): void {
  // ...
}
```
- 戻り値は型を指定すること
```ts
export interface TestResult {
  success: boolean;
  message: string;
}
test(params: TestParams): TestResult {
  // ...
  return {
    success: true,
    message: '処理が成功しました',
  };
}
``` 
- ただし、戻り値が一つの場合は、型指定はせず、直接プリミティブやオブジェクトを返すこと


#### nullとundefinedの使い分け
- 原則undefinedを使用すること
- nullはライブラリなどの外部仕様でnullを使用する場合のみ使用すること
- 引数の省略可能な場合は、`?`を使用してundefinedにすること
```ts
interface SampleInterface {
  sampleProperty?: string;
}
```



### ページ
- 画面のレイアウトを決めるコンポーネント名は`XxxLayout`とすること
  - 例: `AuthRoleSelectLayout`

#### 画面引数の渡し方
- 画面コンポーネントは普通のpropsで引数を受け取ること
- ナビゲーションのルートパラメータは、ラッパーコンポーネントでpropsに変換すること
- 例:
  ```tsx
  // 画面コンポーネント（props型式）
  export interface PageProps {
    param1: string;
    param2?: number;
  }
  
  export const Page: React.FC<PageProps> = ({ param1, param2 }) => {
    // ...
  };
  
  // ナビゲーターでのラッパー
  const PageWrapper: React.FC = () => {
    const route = useRoute<RouteProp<StackParamList, 'ScreenName'>>();
    return <Page param1={route.params.param1} param2={route.params.param2} />;
  };
  ```
- 理由: テスタブルで依存関係が明確になるため

#### 画面遷移時の書き方
- 画面遷移は必ずナビゲーションのメタデータを使用すること
```ts
// ナビゲーションのメタデータ例
export const AuthStackMeta = {
  screens: {
    login: 'Login' as const,
    register: 'Register' as const,
    emailVerify: 'EmailVerify' as const,
  },
};
```

- 画面遷移の例
```ts
const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
navigation.navigate(AuthStackMeta.screens.emailVerify, { email: 'user@example.com' });
```


### UIコンポーネント
- 戻るボタンはexpo標準のものを使用すること
- 部品を作成する前にshared/componentsに同じものがないか確認すること

### 状態管理

#### useStateのフック
- 配置場所: `states/useXxx.ts`
- 外部の画面から状態を更新、参照する目的がない場合は、useStateを使用すること

- 具体例:
  - 画面内で完結するモーダルの開閉状態
  - 画面内で完結するタブの選択状態
  - ローディング状態

#### zustandのstore
- 配置場所: `states/xxxStore.ts`
- storeは、外部の画面から状態を更新、参照する目的がある場合のみ使用する
- それ以外の場合は、useStateを使用すること
- storeは必ず、以下のいづれかのベースクラスを継承すること
  - `BaseStore`: 共通（以下のいづれにも該当しない場合）
  - `BaseFormStore`: フォーム用（BaseStoreを継承している）
    - フォーム内の入力値、バリデーション状態、エラーメッセージなどを管理する
  - `BaseFilterStore`: フィルター用（BaseStoreを継承している）

- 関数名:
  - 更新系: `setXxx`
  - 参照系: `getXxx`

### モデル
#### フォーム
- フォームとは、ユーザが入力するデータを管理するためのモデル
- ファイル名は`xxxForm.ts`とすること
- モデルは`BaseForm`を継承すること

#### フィルター
- フィルターとは、一覧表示などで使用するフィルター条件を管理するためのモデル
- ファイル名は`xxxFilter.ts`とすること
- モデルは`BaseFilter`を継承すること

#### ビュー
- ビューとは、ユーザに表示するためのデータを管理するためのモデル
- ファイル名は`xxxView.ts`とすること
- モデルは`BaseView`を継承すること

### 値オブジェクト
- バックエンド、フロントエンド共通で使用する
- routerの引数にするときは、toZodData()を使用してプリミティブな型に変換すること
- routerの戻り値から値オブジェクトを生成するときは、fromZodData()を使用すること
- 

### ハンドラー
- ボタンやインプットボックスのイベントハンドラーは必ずハンドラーとして分離すること

- ハンドラーの生成はハンドラー生成フックで行うこと
  - 例: `createRoleSelectPageHandlers`
- Pageからはハンドラー生成フックを呼び出して、ハンドラーを取得すること
- ハンドラー生成フックでは引数でStoreを受け取り、内部でハンドラーを生成すること
  - 画面側では、Storeの生成のみを行う。

- service層を呼び出す際は、引数として受け取るようにすること（テスタブルにするため）
  - 実際にserviceの初期化、注入は画面側で行うこと
- 状態管理を行う場合は、更新メソッドや値は引数として受け取ること（テスタブルにするため）


### サービス層
- フォルダ名: `services`
- ファイル名: 動詞+名詞(例: `createFamilyInvite.ts`)
- クラス？関数？: 関数型で記載すること

- 状態管理は行わず、純粋にビジネスロジックを実装すること
  - 理由: 状態管理はハンドラで行うため

#### バックエンドのサービス層
- 引数はプリミティブなデータ型にすること
  - 値オブジェクトやドメインモデルの構築はサービス層で行うこと
  - 理由: 
    - 依存関係を減らし、再利用性を高めるため
    - 例外処理をサービス層で一元管理するため

### ルータ
#### Zodスキーマ
- Zodスキーマを定義するときは、極力値オブジェクト内のスキーマを使用すること
```ts
// 値オブエジェクト.ts
export const SampleObjectSchema = z.string();  // ファイルの一番上にZodスキーマを書くこと
// 値オブエジェクトはメンバが一つしかないため、z.objectにはしないこと

/** 招待コードを表す値オブジェクト */
export class SampleObject extends BaseValueObject<string, typeof SampleObjectSchema> {
  constructor(value: string) {
    super({ value });
  }
  ...
}

// xxxRouter.ts

// レスポンススキーマ
export const sampleResponseSchema = z.object({
  sampleObject: SampleObjectSchema  // 値オブジェクトのスキーマを使用すること
});

```
- 値オブエジェクトのスキーマでは、文字列制限などは書かない
  - 理由: 値オブジェクト自身が制約をもつため、値オブジェクトのスキーマで制約を書くと二重になるため

### 命名規則
#### ブーリアン
- isXxx, hasXxx, canXxxの形式で命名すること
  - 例: isEnabled, hasChildren, canEdit, shouldFetchなど
- 否定形は使用しないこと
  - 例: isNotEnabled, isDisabled, cannotEditは使用しないこと
  - 理由: 否定形は理解しづらいため
- isをつけない形式にはしないこと
  - 例: enabled, visible, editableは使用しないこと
  - 理由: ブーリアンであることがわかりづらいため
- 例外:
  - UIのスタイル名がそのまま使われている場合は除く
    - 例: disabled, active, focused, selected, checkedなど

#### 英語の日本語表記
- 基本は伸ばし棒は省略
  - 例: カテゴリ、ハンドラ
- ページ名は`ドメイン名 + 動詞 + Page`の形式で記述すること
  - 例: `auth + create + Page` → `AuthCreatePage`
  - 例: `user + register + Page` → `UserRegisterPage`

#### UI系
- 基盤となるコンポーネント部品は`XxxLayout`とすること
  - 例: ナビゲーションタブ -> `NavigationTabLayout`
    - 使う側: `ParentNavigationTab`として、内部で`NavigationTabLayout`を使用する
  - 


#### TypeScriptの命名規則
- 定数: UPPER_SNAKE_CASE
- クラス、インターフェース、型エイリアス: PascalCase
- 変数、関数、メソッド、プロパティ: camelCase
- ts: camelCase.ts
- tsx: PascalCase.tsx
- フォルダ名: camel-case

### デモページ
- デモページには以下機能がある
  - コンポーネント一覧の動作確認
  - 各ページの動作確認
  - 
