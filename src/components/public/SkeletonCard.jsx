import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="az-skeleton-card">
      <div className="az-skeleton az-skeleton-img" />
      <div className="az-skeleton-content">
        <div className="az-skeleton az-skeleton-line" />
        <div className="az-skeleton az-skeleton-line short" />
        <div className="az-skeleton az-skeleton-line tiny" />
      </div>
    </div>
  );
}
