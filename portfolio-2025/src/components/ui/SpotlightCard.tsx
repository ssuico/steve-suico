import type { HTMLAttributes, MouseEvent } from 'react';

const SpotlightCard = ({ className = '', onMouseMove, children, ...rest }: HTMLAttributes<HTMLElement>) => {
  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - box.top}px`);
    onMouseMove?.(event);
  };

  return (
    <article
      {...rest}
      onMouseMove={handleMove}
      className={`card spotlight transition-colors duration-300 hover:border-pink-500/30 ${className}`}
    >
      {children}
    </article>
  );
};

export default SpotlightCard;
