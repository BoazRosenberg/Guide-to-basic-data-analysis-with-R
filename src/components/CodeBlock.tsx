import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  title?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  title = 'script.R',
  highlightLines = [],
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Syntax highlighting for a single line of R code in default RStudio style:
  // - White background
  // - Black/charcoal base code text (#212529)
  // - Green comments (#22863a / emerald-700)
  // - Blue keywords, booleans, NA, operators, and functions (#0000ff / blue-700)
  // - Brownish-red strings (#a31515 / red-800)
  const renderHighlightedLine = (line: string) => {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('#')) {
      const leadingSpaces = line.length - trimmed.length;
      return (
        <>
          {leadingSpaces > 0 && <span>{' '.repeat(leadingSpaces)}</span>}
          <span className="text-[#2e7d32] font-mono italic">{trimmed}</span>
        </>
      );
    }

    let codePart = line;
    let commentPart = '';
    const commentIndex = line.indexOf('#');
    if (commentIndex !== -1) {
      const beforeComment = line.slice(0, commentIndex);
      const quotesCount = (beforeComment.match(/"/g) || []).length;
      if (quotesCount % 2 === 0) {
        codePart = line.slice(0, commentIndex);
        commentPart = line.slice(commentIndex);
      }
    }

    const tokens = tokenizeR(codePart);

    return (
      <>
        {tokens.map((token, idx) => {
          switch (token.type) {
            case 'keyword':
              return (
                <span key={idx} className="text-[#0000ff] font-semibold">
                  {token.value}
                </span>
              );
            case 'operator':
              return (
                <span key={idx} className="text-[#0000ff] font-medium">
                  {token.value}
                </span>
              );
            case 'pipe':
              return (
                <span key={idx} className="text-[#0550ae] font-bold">
                  {token.value}
                </span>
              );
            case 'function':
              return (
                <span key={idx} className="text-[#000000] font-semibold">
                  {token.value}
                </span>
              );
            case 'string':
              return (
                <span key={idx} className="text-[#a31515]">
                  {token.value}
                </span>
              );
            case 'number':
              return (
                <span key={idx} className="text-[#098658] font-medium">
                  {token.value}
                </span>
              );
            case 'special':
              return (
                <span key={idx} className="text-[#0000ff] font-bold">
                  {token.value}
                </span>
              );
            default:
              return <span key={idx} className="text-[#212529]">{token.value}</span>;
          }
        })}
        {commentPart && (
          <span className="text-[#2e7d32] font-mono italic">{commentPart}</span>
        )}
      </>
    );
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-5 rounded-lg border border-[#d1d5db] bg-white shadow-xs overflow-hidden font-mono text-[13.5px] leading-relaxed">
      {/* RStudio-style Editor Tab Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#f3f4f6] border-b border-[#e5e7eb] text-xs text-slate-600 select-none">
        <div className="flex items-center gap-2">
          {/* R file tab */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#d1d5db] border-b-white rounded-t font-sans text-xs font-medium text-slate-800 -mb-[7px]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#20639B] text-[8px] text-white flex items-center justify-center font-bold font-mono">
              R
            </span>
            <span className="font-mono text-[12px]">{title}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors text-xs font-sans font-medium cursor-pointer shadow-2xs"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content with RStudio white editor styling */}
      <div className="overflow-x-auto py-2 bg-white">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isHighlighted = highlightLines.includes(lineNum);

              return (
                <tr
                  key={idx}
                  className={`group transition-colors ${
                    isHighlighted
                      ? 'bg-[#e2e8f0]'
                      : 'hover:bg-[#f8fafc]'
                  }`}
                >
                  {showLineNumbers && (
                    <td className="w-10 pl-3 pr-3 text-right select-none align-top text-xs text-slate-400 group-hover:text-slate-600 border-r border-[#e5e7eb] bg-[#fafafa]">
                      {lineNum}
                    </td>
                  )}
                  <td className="pl-4 pr-4 py-0.5 whitespace-pre font-mono text-[#212529] align-top">
                    {renderHighlightedLine(line)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface Token {
  type: 'keyword' | 'operator' | 'pipe' | 'function' | 'string' | 'number' | 'special' | 'text';
  value: string;
}

function tokenizeR(code: string): Token[] {
  const tokens: Token[] = [];
  const regex = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|%>%>|%>\%|\|>|<-|->|==|!=|<=|>=|%in%|\$|::|:|\b(?:library|require|for|in|if|else|while|repeat|function|return|TRUE|FALSE|NA|NULL|Inf|NaN)\b|\b(?:ggplot|aes|geom_\w+|labs|theme_\w+|scale_\w+|facet_\w+|filter|select|mutate|summarize|group_by|pivot_longer|pivot_wider|left_join|right_join|inner_join|full_join|bind_rows|bind_cols|c|data\.frame|sample|print|paste|paste0|max|min|mean|median|sd|sum|length|head|tail|str|summary|read\.csv|write\.csv|as\.numeric|as\.character|as\.logical|factor|table)\b|\b\d+(?:\.\d+)?\b|[+*\/^<>&|!]|\w+|[^\w\s"']+|\s+)/g;

  let match;
  while ((match = regex.exec(code)) !== null) {
    const val = match[0];
    if (val.startsWith('"') || val.startsWith("'")) {
      tokens.push({ type: 'string', value: val });
    } else if (val === '%>%' || val === '|>') {
      tokens.push({ type: 'pipe', value: val });
    } else if (
      val === '<-' ||
      val === '->' ||
      val === '==' ||
      val === '!=' ||
      val === '<=' ||
      val === '>=' ||
      val === '%in%' ||
      val === '$' ||
      val === '+' ||
      val === '*' ||
      val === '/' ||
      val === '^' ||
      val === '&' ||
      val === '|' ||
      val === '!' ||
      val === '<' ||
      val === '>'
    ) {
      tokens.push({ type: 'operator', value: val });
    } else if (['TRUE', 'FALSE', 'NA', 'NULL', 'Inf', 'NaN'].includes(val)) {
      tokens.push({ type: 'special', value: val });
    } else if (['library', 'require', 'for', 'in', 'if', 'else', 'while', 'repeat', 'function', 'return'].includes(val)) {
      tokens.push({ type: 'keyword', value: val });
    } else if (
      /^(?:ggplot|aes|geom_\w+|labs|theme_\w+|scale_\w+|facet_\w+|filter|select|mutate|summarize|group_by|pivot_longer|pivot_wider|left_join|right_join|inner_join|full_join|bind_rows|bind_cols|c|data\.frame|sample|print|paste|paste0|max|min|mean|median|sd|sum|length|head|tail|str|summary|read\.csv|write\.csv|as\.numeric|as\.character|as\.logical|factor|table)$/.test(val)
    ) {
      tokens.push({ type: 'function', value: val });
    } else if (/^\d+(?:\.\d+)?$/.test(val)) {
      tokens.push({ type: 'number', value: val });
    } else {
      tokens.push({ type: 'text', value: val });
    }
  }

  return tokens;
}

export default CodeBlock;
