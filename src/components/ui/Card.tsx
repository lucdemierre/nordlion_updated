'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { colors, transitions, borderRadius } from '@/styles/design-tokens';

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  category: string;
  id: string;
  description?: string;
  specs?: string[];
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  category,
  id,
  description,
  specs,
}) => {
  return (
    <Link
      href={`/${category}/${id}`}
      style={{
        display: 'block',
        backgroundColor: colors.cardBg,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        transition: transitions.base,
        border: `1px solid ${colors.border}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.borderLight;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: colors.white,
            marginBottom: '0.5rem',
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontSize: '0.875rem',
              color: colors.gray,
              marginBottom: '1rem',
              lineHeight: '1.5',
            }}
          >
            {description}
          </p>
        )}
        {specs && specs.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            {specs.slice(0, 3).map((spec, index) => (
              <span
                key={index}
                style={{
                  fontSize: '0.75rem',
                  color: colors.darkTextGray,
                  marginRight: '0.75rem',
                }}
              >
                {spec}
              </span>
            ))}
          </div>
        )}
        <p
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: colors.primary,
          }}
        >
          {price}
        </p>
      </div>
    </Link>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  slug: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  slug,
}) => {
  return (
    <Link
      href={`/services/${slug}`}
      style={{
        display: 'block',
        backgroundColor: colors.cardBg,
        padding: '2rem',
        borderRadius: borderRadius.lg,
        transition: transitions.base,
        border: `1px solid ${colors.border}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.primary;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {icon && (
        <div style={{ marginBottom: '1rem', color: colors.primary }}>
          {icon}
        </div>
      )}
      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: colors.white,
          marginBottom: '1rem',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '1rem',
          color: colors.gray,
          lineHeight: '1.75',
        }}
      >
        {description}
      </p>
    </Link>
  );
};

interface ArticleCardProps {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  date: string;
  category: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  excerpt,
  image,
  slug,
  date,
  category,
}) => {
  return (
    <Link
      href={`/journal/${slug}`}
      style={{
        display: 'block',
        backgroundColor: colors.cardBg,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        transition: transitions.base,
        border: `1px solid ${colors.border}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.borderLight;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '250px' }}>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div style={{ padding: '1.5rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              color: colors.primary,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: '600',
            }}
          >
            {category}
          </span>
          <span style={{ fontSize: '0.75rem', color: colors.darkTextGray }}>
            {date}
          </span>
        </div>
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: colors.white,
            marginBottom: '0.75rem',
            lineHeight: '1.4',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '0.875rem',
            color: colors.gray,
            lineHeight: '1.6',
          }}
        >
          {excerpt}
        </p>
      </div>
    </Link>
  );
};

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  trend,
}) => {
  return (
    <div
      style={{
        backgroundColor: colors.cardBg,
        padding: '1.5rem',
        borderRadius: borderRadius.lg,
        border: `1px solid ${colors.border}`,
      }}
    >
      <p
        style={{
          fontSize: '0.875rem',
          color: colors.gray,
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: colors.white,
          marginBottom: change ? '0.5rem' : '0',
        }}
      >
        {value}
      </p>
      {change && (
        <p
          style={{
            fontSize: '0.875rem',
            color:
              trend === 'up'
                ? colors.success
                : trend === 'down'
                ? colors.error
                : colors.gray,
          }}
        >
          {change}
        </p>
      )}
    </div>
  );
};
