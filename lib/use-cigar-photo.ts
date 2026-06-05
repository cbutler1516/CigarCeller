"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { compressImageToBase64, getImageProcessingErrorMessage } from "./image-utils";

export function useCigarPhoto(initialPhoto: string | null = null) {
  const [photo, setPhoto] = useState<string | null>(initialPhoto);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const blobUrlRef = useRef<string | null>(null);

  const revokeBlobUrl = useCallback(() => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  }, []);

  useEffect(() => {
    setPhoto(initialPhoto);
  }, [initialPhoto]);

  useEffect(() => revokeBlobUrl, [revokeBlobUrl]);

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;

      setError(null);
      revokeBlobUrl();

      const instantPreview = URL.createObjectURL(file);
      blobUrlRef.current = instantPreview;
      setPhoto(instantPreview);
      setIsProcessing(true);

      try {
        const base64 = await compressImageToBase64(file);
        revokeBlobUrl();
        setPhoto(base64);
      } catch (err) {
        revokeBlobUrl();
        setPhoto(initialPhoto);
        setError(getImageProcessingErrorMessage(err));
      } finally {
        setIsProcessing(false);
      }
    },
    [initialPhoto, revokeBlobUrl],
  );

  const clearPhoto = useCallback(() => {
    revokeBlobUrl();
    setPhoto(null);
    setError(null);
  }, [revokeBlobUrl]);

  return { photo, error, isProcessing, handleFile, clearPhoto, setError };
}
