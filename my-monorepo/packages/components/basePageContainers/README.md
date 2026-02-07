# Common Layout Wrappers

Short usage rules for layout containers following KISS/DRY.

## Page Skeleton (typical layout)

```tsx
<PageContainer>
  <PageBody>
    <SectionContainer>
      <ColumnSection>
        <InnerColumnSection>
          <ContentSection>{/* Your content */}</ContentSection>
        </InnerColumnSection>
      </ColumnSection>
    </SectionContainer>
  </PageBody>
</PageContainer>
```

## PageContainer

- Wrap the entire page.
- Use as the outer layout container.

## PageBody

- Wrap the page content.
- Set background via `backgroundColor` (semantic roles): `strong`, `surface`, `brandSubtle`.
- Control paddings: `paddingTop|Right|Bottom|Left` (px).
- Remove horizontal padding on mobile: `resetHorizontalPaddingOnMobile`.

## SectionContainer

- Create page sections (outer-most section wrapper).
- Span full viewport width: `fullBleed`.
- Remove padding: `noPadding` or selectively `noTopPadding`, `noBottomPadding`.
- Set background: `backgroundColor` + optional `backgroundOpacity` (0–1 or 0–100).
  - `backgroundColor`: `surface` | `brandSubtle` | `strong` | `scrim`
- Override section paddings: `paddingTop|Right|Bottom|Left`.
- Remove horizontal padding on mobile: `resetHorizontalPaddingOnMobile`.
- Add a custom class: `className`.

## ColumnSection

- Build a multi-column layout within a section.
- Define column ratios: `ratio` (e.g., `"1:2:1"`).
- Set column distribution: `justify` (`start|center|end|between|around|evenly`).
- Set vertical alignment: `align` (`stretch|start|center|end|baseline`).
- Set gaps: `gapX` (`gx-16|gx-32`), `gapY` (`gy-16|gy-32`).
- Choose stacking breakpoint: `stackAt` (`mobile|tablet`).
- Reverse order when stacked: `reverseOnStack`.

## InnerColumnSection

- Use inside `ColumnSection` to handle alignment and gaps.
- Set direction: `direction` (`row|column`).
- Set horizontal alignment: `horizontalAlign` (`left|center|right`).
- Set vertical alignment: `verticalAlign` (`top|middle|bottom`).
- Set child spacing: `gap` (`16|24|32`).
- Add boxed padding: `boxed`.
- Set background: `backgroundColor` (`surface|brandSubtle`).
- Add a custom class: `className`.

## ContentSection

- Wrap actual content (typically inside `InnerColumnSection`).
- Set direction: `direction` (`row|column`).
- Set alignment: `horizontalAlign` (`left|center|right`), `verticalAlign` (`top|middle|bottom`).
- Stretch direct children across the cross axis: `stretchChildren`.
- Set child spacing: `gap` (`16|24|32`).
- Add boxed padding: `boxed`.
- Emphasize section: `highlighted` (blue left border).
- Dim section: `unlighted` (faded style; can be combined with `highlighted`).
- Add a custom class: `className`.
- Forward extra attributes/handlers to `<div>`: `...rest` (e.g., `id`, `role`, `aria-*`, `data-*`, `style`, `onClick`).

## Tips

- Keep a short, readable container hierarchy as in the example.
- Use `ratio` in `ColumnSection` when columns differ in width.
- Use `highlighted`/`unlighted` to clearly signal section state.
- Prefer `className` + CSS Modules for local styling tweaks.
