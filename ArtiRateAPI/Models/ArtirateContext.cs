using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ArtiRateAPI.Models;

public partial class ArtirateContext : DbContext
{
    public ArtirateContext()
    {
    }

    public ArtirateContext(DbContextOptions<ArtirateContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Generator> Generators { get; set; }

    public virtual DbSet<Image> Images { get; set; }

    public virtual DbSet<Rating> Ratings { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=artirate;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Generator>(entity =>
        {
            entity.ToTable("generators");

            entity.Property(e => e.GeneratorId)
                .ValueGeneratedNever()
                .HasColumnName("generatorId");
            entity.Property(e => e.GeneratorName)
                .HasMaxLength(120)
                .IsUnicode(false)
                .HasColumnName("generatorName");
            entity.Property(e => e.GeneratorUrl)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("generatorUrl");
        });

        modelBuilder.Entity<Image>(entity =>
        {
            entity.HasKey(e => e.ImgId);

            entity.ToTable("images");

            entity.Property(e => e.ImgId).HasColumnName("imgId");
            entity.Property(e => e.GeneratorId).HasColumnName("generatorId");
            entity.Property(e => e.ImgDescription)
                .HasMaxLength(1200)
                .IsUnicode(false)
                .HasColumnName("imgDescription");
            entity.Property(e => e.ImgPrompt)
                .HasMaxLength(1200)
                .IsUnicode(false)
                .HasColumnName("imgPrompt");
            entity.Property(e => e.ImgTitle)
                .HasMaxLength(120)
                .IsUnicode(false)
                .HasColumnName("imgTitle");
            entity.Property(e => e.ImgUrl)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("imgUrl");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Generator).WithMany(p => p.Images)
                .HasForeignKey(d => d.GeneratorId)
                .HasConstraintName("FK_images_generators");

            entity.HasOne(d => d.User).WithMany(p => p.Images)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_images_users");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.ToTable("ratings");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ImgId).HasColumnName("imgId");
            entity.Property(e => e.RatingValue).HasColumnName("ratingValue");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Img).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.ImgId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ratings_images");

            entity.HasOne(d => d.User).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ratings_users");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");

            entity.Property(e => e.UserId).HasColumnName("userId");
            entity.Property(e => e.FirebaseLink)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("firebase_link");
            entity.Property(e => e.Role)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("role");
            entity.Property(e => e.Username)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
